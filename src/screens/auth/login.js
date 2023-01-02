/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as Yup from 'yup';
import {
  AppForm,
  AppFormInput,
  HeroImage,
  SocialButton,
  SubmitButton,
} from '../../components';
import icons from '../../constants/icons';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import useAuth from '../../hooks/useAuth';
import {translate} from '../../I18n';

const custom_height = SIZES.height / 3;

export const LoginScreen = ({navigation}) => {
  const inputfields = [
    {title: translate('email'), name: 'email', icon: icons.email},
    {title: translate('password'), name: 'password', icon: icons.password},
  ];

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().label('Password'),
  });

  const {signin, loginWithFacebook, loginWithGoogle, loading} = useAuth();

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeroImage height={custom_height} />
      <View style={{flex: 1, paddingHorizontal: 20, marginTop: 10}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.inputContainer}>
            <Text style={styles.title}> {translate('login')}</Text>
            <Text style={styles.subtitle}>
              {translate('IdentifyToContinue')}
            </Text>
          </View>
          <AppForm
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={signin}>
            {inputfields.map(input => (
              <View style={input.name} key={input.name}>
                <AppFormInput
                  title={input.title}
                  icon={input.icon}
                  secureTextEntry={
                    input.name === 'password' ||
                    input.name === 'password_confirmation'
                  }
                  name={input.name}
                />
              </View>
            ))}
            <View style={{marginVertical: 30}}>
              {/* Terms and conditions  */}

              <View style={{width: '80%', alignSelf: 'center'}}>
                <SubmitButton
                  title={translate('signin')}
                  radius={50}
                  loading={loading}
                />

                {/* sign in with social accounts  */}
                <View style={styles.socialContainer}>
                  <View style={styles.flexRow}>
                    <View
                      style={{flex: 1, height: 1, backgroundColor: 'black'}}
                    />
                    <View>
                      <Text style={styles.socialTitle}>
                        {translate('orContinueWith')}
                      </Text>
                    </View>
                    <View
                      style={{flex: 1, height: 1, backgroundColor: 'black'}}
                    />
                  </View>
                  <View style={styles.rowAround}>
                    <SocialButton
                      onPress={loginWithFacebook}
                      loading={loading}
                      icon={icons.facebook}
                    />
                    <SocialButton
                      onPress={loginWithGoogle}
                      loading={loading}
                      icon={icons.google}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={{alignSelf: 'center', marginTop: 5}}
                  onPress={() => navigation.navigate('forgetPassword')}>
                  <Text style={{...FONTS.body5}}>
                    {translate('forgotYourPassword')}
                  </Text>
                </TouchableOpacity>
                <View style={{alignItems: 'center', marginTop: 10}}>
                  <Text style={styles.noRegisterdTxt}>
                    {translate('notRegisterYet')}{' '}
                    <Text
                      style={{
                        color: COLORS.primary,
                      }}
                      onPress={() => navigation.navigate('signup')}>
                      {translate('signup')}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </AppForm>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...FONTS.h2,
    textTransform: 'uppercase',
  },
  subtitle: {
    ...FONTS.body5,
    fontSize: 12,
  },
  socialContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  socialTitle: {
    textAlign: 'center',
    ...FONTS.h3,
    letterSpacing: 1,
    marginHorizontal: 5,
  },
  rowAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  noRegisterdTxt: {
    ...FONTS.h4,
    textTransform: 'uppercase',
    fontSize: 12,
  },
});
