/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppHeader, Appicon, BaseView} from '../../components';
import icons from '../../constants/icons';
import {COLORS, FONTS} from '../../constants/theme';
import AuthContext from '../../store/AuthContext';
import {getPackages} from '../../store/reducers/packages';

const PackageCard = ({pkg, active, onPressCard}) => {
  return (
    <TouchableOpacity
      onPress={onPressCard}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: active ? COLORS.primary : COLORS.lightGray,
        borderRadius: 10,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <View style={{flex: 1}}>
        <Text
          style={{...FONTS.h3, color: active ? COLORS.white : COLORS.black}}>
          {pkg?.name}
        </Text>
        <Text
          style={{
            ...FONTS.body4,
            color: active ? COLORS.white : COLORS.black,
          }}>
          {pkg?.subtitle}
        </Text>
      </View>
      <View style={{transform: [{rotate: '180deg'}]}}>
        <Appicon
          icon={icons.back}
          size={15}
          color={active ? COLORS.white : COLORS.black}
        />
      </View>
    </TouchableOpacity>
  );
};

export const AvailiblePlansScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useContext(AuthContext);
  const {initialLoading, packages} = useSelector(state => state.packages);

  const package_id = user?.is_subscribed?.subscribe?.package_id;

  useEffect(() => {
    dispatch(getPackages());
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <AppHeader title={'Availible Plans'} />
      <BaseView
        styles={{flex: 1, paddingHorizontal: 5}}
        loading={initialLoading}>
        <FlatList
          contentContainerStyle={{flex: 1, paddingHorizontal: 10}}
          data={packages}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <PackageCard
              pkg={item}
              active={package_id === item?.id}
              onPressCard={() => navigation.navigate('planDetails', {item})}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={initialLoading}
              onRefresh={() => dispatch(getPackages())}
            />
          }
        />
      </BaseView>
    </View>
  );
};
