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
import useAuth from '../../hooks/useAuth';
import toast from '../../toast';
import server from '../../server';
import helpers from '../../constants/helpers';

const inputfields = [{title: '6 digit code', name: 'code', icon: icons.tick}];

const validationSchema = Yup.object().shape({
  code: Yup.string().required().label('Otp'),
});

export const SignupOtpScreen = ({navigation, route}) => {
  const {signup, loading} = useAuth();
  const [overlayLoading, setOverlayLoading] = useState(false);

  const otp = route.params?.otp;
  const payload = route?.params?.payload;
  const email = payload?.email;

  const changePassword = values => {
    const {code} = values;
    if (code == otp) {
      signup(payload);
    } else {
      return toast.show('otp is invalid');
    }
  };

  const resendCode = () => {
    setOverlayLoading(true);
    server.sendEmailOtp({email: email}).then(resp => {
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
      <AppHeader title={'Verify email'} backButton />
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
            we sent your email / Spams* with 6 digit code
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
                  <Text
                    onPress={resendCode}
                    style={{color: COLORS.primary, marginLeft: 3}}>
                    Resend
                  </Text>
                </Text>
              </View>
            </View>
          </AppForm>
        </View>
      </View>
    </BaseView>
  );
};
