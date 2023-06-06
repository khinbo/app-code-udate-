import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import AuthContext from '../../store/AuthContext';
import {AppButton, AppHeader, BaseView, InfoRow} from '../../components';
import {COLORS, FONTS} from '../../constants/theme';
import moment from 'moment';
import helpers from '../../constants/helpers';
import useAuth from '../../hooks/useAuth';
import {translate} from '../../I18n';

export const ProfileScreen = () => {
  const {loading, deleteAccount} = useAuth();
  const {user} = useContext(AuthContext);

  const handleDeleteAccount = () => {
    Alert.alert(
      translate('confirmDeleteAccountTitle'),
      translate('confirmDeleteAccountMessage'),
      [
        {
          text: translate('cancel'),
          style: 'cancel',
        },
        {
          text: translate('delete'),
          style: 'destructive',
          onPress: () => {
            deleteAccount();
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <>
      <AppHeader
        title={'Profile'}
        // onPressRight={() => {}}
        // rightIcon={icons.edit}
      />
      <BaseView styles={styles.container} overlayLoading={loading}>
        <View style={styles.innerContainer}>
          <Image source={{uri: helpers.getImage(user?.dp)}} style={styles.dp} />
          <Text style={styles.title}>{user?.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <InfoRow title={'Email'} value={user?.email} />
          <InfoRow
            title={'Date of birth'}
            value={moment(user?.dob).format('MM / DD / YYYY')}
          />
          <InfoRow title={'Gender'} value={helpers.getGender(user?.gender)} />
          <InfoRow title={'Country'} value={user?.country?.name} />
          <AppButton
            title={translate('deleteAccount')}
            onPress={handleDeleteAccount}
          />
        </View>
        {/* <PackageInfo /> */}
      </BaseView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  innerContainer: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dp: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  title: {
    ...FONTS.h4,
    marginTop: 10,
    color: COLORS.black,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 20,
  },
});
