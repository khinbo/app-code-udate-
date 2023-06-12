/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import * as Yup from 'yup';
import {
  AppForm,
  AppFormInput,
  AppHeader,
  BaseView,
  SubmitButton,
} from '../../components';
import icons from '../../constants/icons';
import {COLORS, FONTS} from '../../constants/theme';
import server from '../../server';
import toast from '../../toast';
import helpers from '../../constants/helpers';

const inputfields = [{title: '6 digit code', name: 'code', icon: icons.tick}];

const validationSchema = Yup.object().shape({
  code: Yup.string().required().label('Otp'),
});

export const OtpScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [overlayLoading, setOverlayLoading] = useState(false);

  const user = route.params?.user;

  const changePassword = values => {
    const {code} = values;
    if (code == user?.otp) {
      setTimeout(() => {
        navigation.navigate('resetPassword', {email: user?.email});
      }, 500);
    } else {
      return toast.show('otp is invalid');
    }
  };

  const resendCode = () => {
    setOverlayLoading(true);
    server.sendEmailOtp({email: user?.email}).then(resp => {
      setOverlayLoading(false);
      if (!resp.ok) {
        helpers.apiResponseErrorHandler(resp);
      } else {
        helpers.apiMessageHandler(resp);
      }
    });
  };

  return (
    <BaseView
      overlayLoading={overlayLoading}
      styles={{flex: 1, backgroundColor: COLORS.white}}>
      <AppHeader title={'Forget Password'} backButton />
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            marginTop: 40,
            paddingHorizontal: 25,
          }}>
          <Text
            style={{
              ...FONTS.h3,
              marginBottom: 20,
              color: COLORS.gray,
            }}>
            we sent your email with 6 digit code
          </Text>
          <AppForm
            initialValues={{
              code: '',
            }}
            validationSchema={validationSchema}
            onSubmit={changePassword}>
            {inputfields.map(input => (
              <View style={input.name} key={input.name}>
                <AppFormInput
                  title={input.title}
                  icon={input.icon}
                  name={input.name}
                  keyboardType="number-pad"
                  secureTextEntry={
                    input.name === 'password' ||
                    input.name === 'password_confirmation'
                  }
                />
              </View>
            ))}
            <View
              style={{
                marginBottom: 20,
                marginTop: 5,
              }}>
              <SubmitButton title="Continue" loading={loading} />
              <View
                style={{
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    ...FONTS.body4,
                    textAlign: 'center',
                  }}>
                  didn't receive a code.
                  <TouchableOpacity
                    disabled={overlayLoading}
                    onPress={resendCode}
                    style={{color: COLORS.primary, marginLeft: 3}}>
                    Resend
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </AppForm>
        </View>
      </View>
    </BaseView>
  );
};
