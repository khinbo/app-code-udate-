/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import * as Yup from 'yup';
import {
  AppForm,
  AppFormDatePicker,
  AppFormInput,
  AppFormPicker,
  AppFormRadio,
  BaseView,
  SocialButton,
  SubmitButton,
} from '../../components';
import icons from '../../constants/icons';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import useAuth from '../../hooks/useAuth';
import {translate} from '../../I18n';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import images from '../../constants/images';
import server from '../../server';
import toast from '../../toast';

const custom_height = SIZES.height / 3;

export const SignupScreen = ({navigation}) => {
  const inputfields = [
    {title: translate('nameTitle'), name: 'name', icon: icons.user},
    {title: translate('emailTitle'), name: 'email', icon: icons.email},
    {
      title: translate('passwordTitle'),
      name: 'password',
      icon: icons.password,
    },
    {
      title: translate('confirmPasswordTitle'),
      name: 'password_confirmation',
      icon: icons.password,
    },
  ];

  const genderdata = [
    {
      label: translate('male'),
      accessibilityLabel: '1',
    },
    {
      label: translate('female'),
      accessibilityLabel: '2',
    },
    {
      label: translate('nonBinary'),
      accessibilityLabel: '3',
    },
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label('Name'),
    email: Yup.string().required().email().label('Email'),
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
    dob: Yup.string().required().label('Date of birth'),
    country: Yup.string().required().label('Country'),
    gender: Yup.string().required().label('Gender'),
  });

  const [loading, setLoading] = useState(false);

  const {
    loginWithFacebook,
    loginWithGoogle,
    getCountries,
    countries,
    initialLoading,
  } = useAuth();
  useEffect(() => {
    getCountries();
  }, []);

  const onSignup = payload => {
    setLoading(true);
    server.sendEmailOtp({email: payload?.email}).then(resp => {
      setLoading(false);
      console.log(resp.data);
      if (!resp.ok) toast.show('error while sending otp.');
      else
        navigation.navigate('signupotp', {
          otp: resp.data,
          payload,
        });
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: Platform.OS === 'android' ? 10 : getBottomSpace(),
      }}>
      <View style={{height: custom_height, overflow: 'hidden', top: -20}}>
        <View style={{height: SIZES.height / 3, width: SIZES.width}}>
          <Image
            source={images.logo_two}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      </View>
      <BaseView styles={{flex: 1}} loading={initialLoading}>
        <View style={{flex: 1, paddingHorizontal: 20, marginTop: 5}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            keyboardShouldPersistTaps="handled">
            <View style={styles.bottomContainer}>
              <Text style={styles.title}>{translate('createAccount')}</Text>
              <Text style={styles.subtitle}>
                {translate('registerToContinue')}
              </Text>
              <View style={styles.underLine} />
            </View>

            {/* sign in with social accounts  */}
            <View style={styles.socialContainer}>
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
              <View style={styles.flexRow}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                <View>
                  <Text style={styles.socialTitle}>
                    {translate('orContinueWith')}
                  </Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              </View>
            </View>

            <AppForm
              initialValues={{
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                dob: new Date(2000, 10, 20),
                gender: '1',
                country: '',
                device: Platform.OS,
              }}
              validationSchema={validationSchema}
              onSubmit={onSignup}>
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
              <View>
                <AppFormPicker
                  items={countries}
                  name="country"
                  item_name="name"
                  item_value="id"
                  icon={icons.flag}
                  title={translate('country')}
                  placeholder=""
                />
              </View>
              <View>
                <AppFormDatePicker
                  title={translate('dob')}
                  name="dob"
                  maximumDate={new Date()}
                />
                <View style={styles.genderContainer}>
                  <Text style={styles.genderTitle}>
                    {translate('genderTitle')}
                  </Text>
                  <AppFormRadio data={genderdata} name="gender" />
                </View>

                {/* Terms and conditions  */}

                <View style={{paddingHorizontal: 40, marginTop: 20}}>
                  <Text style={styles.terms}>
                    {translate('byClickingOnOfTheButtons')}{' '}
                    <Text style={{color: COLORS.primary}}>
                      {translate('terms')}
                    </Text>
                  </Text>
                  <Text style={styles.privacy}>
                    {translate('pleaseRead')}{' '}
                    <Text style={{color: COLORS.primary}}>
                      {translate('privacyPilicy')}
                    </Text>{' '}
                    {translate('toKnowWeUseData')}
                  </Text>
                </View>
                <View style={{width: '80%', alignSelf: 'center'}}>
                  <SubmitButton
                    title={translate('signup')}
                    radius={50}
                    loading={loading}
                  />
                  <View style={{alignItems: 'center', marginTop: 10}}>
                    <Text style={styles.desc}>
                      {translate('alreadyHaveAccount')}{' '}
                      <Text
                        style={{
                          color: COLORS.primary,
                        }}
                        onPress={() => navigation.navigate('login')}>
                        {translate('login')}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </AppForm>
          </ScrollView>
        </View>
      </BaseView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...FONTS.h2,
    textTransform: 'capitalize',
  },
  subtitle: {
    ...FONTS.body5,
    fontSize: 12,
  },
  underLine: {
    height: 3,
    width: 60,
    backgroundColor: COLORS.primary,
    marginTop: 10,
  },
  genderContainer: {
    marginTop: 15,
  },
  genderTitle: {
    ...FONTS.h4,
    textTransform: 'uppercase',
    color: 'gray',
  },
  terms: {
    ...FONTS.body4,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  privacy: {
    ...FONTS.body4,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  desc: {
    ...FONTS.h4,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  socialContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
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
});
