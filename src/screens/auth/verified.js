import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Platform} from 'react-native';
import * as Yup from 'yup';
import {
  AppForm,
  AppFormDatePicker,
  AppFormPicker,
  AppFormRadio,
  BaseView,
  SubmitButton,
} from '../../components';
import icons from '../../constants/icons';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import LottieView from 'lottie-react-native';
import useAuth from '../../hooks/useAuth';
import {translate} from '../../I18n';
import moment from 'moment';

const custom_height = SIZES.height / 3;

export const VerifiedScreen = ({route}) => {
  const {user} = route.params;
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
    dob: Yup.string().required().label('Date of birth'),
    country: Yup.string().required().label('Country'),
    gender: Yup.string().required().label('Gender'),
  });

  const {completeProfile, getCountries, countries, initialLoading, loading} =
    useAuth();

  const [initialValues, setInitialValues] = useState({
    dob: new Date(2000, 10, 20),
    gender: '1',
    country: '',
    device: '',
  });

  useEffect(() => {
    setInitialValues({
      dob: user?.dob ? moment(user?.dob).toISOString() : new Date(2000, 10, 20),
      gender: user?.gender ? user.gender : '1',
      country: user?.country ? user?.country?.id : '',
      device: Platform.OS,
    });
  }, []);

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: custom_height, overflow: 'hidden', top: -20}}>
        <View style={{height: SIZES.height / 3, width: SIZES.width}}>
          <LottieView
            source={require('../../../assets/screenanimation.json')}
            autoPlay
            loop={false}
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
              <Text style={styles.title}>{translate('completeProfile')}</Text>
              <View style={styles.inputContainer} />
            </View>

            <AppForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={completeProfile}>
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
                <View
                  style={{
                    width: '80%',
                    alignSelf: 'center',
                    paddingBottom: 10,
                  }}>
                  <SubmitButton
                    title={translate('submit')}
                    radius={50}
                    loading={loading}
                  />
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
    ...FONTS.h3,
    textTransform: 'capitalize',
  },

  inputContainer: {
    height: 3,
    width: 60,
    backgroundColor: COLORS.primary,
    marginTop: 20,
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
});
