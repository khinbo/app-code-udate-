import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import AuthContext from '../../store/AuthContext';
import {AppHeader, BaseView, InfoRow, PackageInfo} from '../../components';
import images from '../../constants/images';
import {COLORS, FONTS} from '../../constants/theme';
import moment from 'moment';
import helpers from '../../constants/helpers';
import icons from '../../constants/icons';

export const ProfileScreen = () => {
  const {user} = useContext(AuthContext);

  return (
    <>
      <AppHeader
        title={'Profile'}
        // onPressRight={() => {}}
        // rightIcon={icons.edit}
      />
      <BaseView styles={styles.container}>
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
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 20,
  },
});
