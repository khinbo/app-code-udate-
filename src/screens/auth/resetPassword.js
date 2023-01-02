/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import * as Yup from 'yup';
import {AppForm, AppFormInput, AppHeader, SubmitButton} from '../../components';
import icons from '../../constants/icons';
import {COLORS, FONTS} from '../../constants/theme';
import {translate} from '../../I18n';
import server from '../../server';
import toast from '../../toast';

const inputfields = [
  {title: 'New password', name: 'password', icon: icons.password},
  {
    title: 'confirm new password',
    name: 'password_confirmation',
    icon: icons.password,
  },
];

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1}).*$/,
      translate('passwordValidation'),
    )
    .label('Password'),
  password_confirmation: Yup.string()
    .required(translate('passwordConfirmValidation'))
    .oneOf([Yup.ref('password'), null], translate('passwordMustMatched')),
});

export const ResetPasswordScreen = ({navigation, route}) => {
  const email = route.params?.email;
  const [loading, setLoading] = useState(false);

  const changePassword = values => {
    const form = {
      ...values,
      email,
    };
    setLoading(true);
    server.resetPassword(form).then(resp => {
      setLoading(false);
      if (!resp.ok) return toast.show(resp.data?.message);
      setTimeout(() => {
        toast.show(resp.data?.message);
        navigation.navigate('login');
      }, 500);
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <AppHeader title={'Change Password'} backButton />
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
              ...FONTS.h2,
              marginBottom: 20,
            }}>
            Change Password
          </Text>
          <AppForm
            initialValues={{
              password: '',
              password_confirmation: '',
            }}
            validationSchema={validationSchema}
            onSubmit={changePassword}>
            {inputfields.map(input => (
              <View style={input.name} key={input.name}>
                <AppFormInput
                  title={input.title}
                  icon={input.icon}
                  name={input.name}
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
              <SubmitButton title="Reset Password" loading={loading} />
            </View>
          </AppForm>
        </View>
      </View>
    </View>
  );
};
