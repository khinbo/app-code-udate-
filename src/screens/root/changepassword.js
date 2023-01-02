/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image} from 'react-native';
import * as Yup from 'yup';
import {AppForm, AppFormInput, AppHeader, SubmitButton} from '../../components';
import icons from '../../constants/icons';
import images from '../../constants/images';
import {COLORS, FONTS} from '../../constants/theme';
import useAuth from '../../hooks/useAuth';
import {translate} from '../../I18n';

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

export const ChangePasswordScreen = () => {
  const {loading, changePassword} = useAuth();
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <AppHeader title={'Change Password'} />
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
        <View
          style={{
            flex: 1,
          }}>
          <Image
            resizeMode="contain"
            source={images.reset_password}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </View>
      </View>
    </View>
  );
};
