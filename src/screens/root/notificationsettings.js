/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, Platform} from 'react-native';
import {AppHeader, BaseView} from '../../components';
import {COLORS, FONTS} from '../../constants/theme';
import server from '../../server';
import toast from '../../toast';

export const NotificationScreen = ({navigation}) => {
  const [loading, setloading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getNotifications();
    });
    return unsubscribe;
  }, [navigation, getNotifications]);

  const getNotifications = useCallback(() => {
    setloading(true);
    server.getNotifications().then(resp => {
      setloading(false);
      if (!resp.ok) {
        return toast.show(
          resp.data?.message ?? 'error while getting notifications',
        );
      }
      const formatedData = resp.data.data.map(item => {
        const body = JSON.parse(item.body);
        return {
          id: item.id,
          read_at: item.read_at,
          title: body?.title,
          body: body?.body,
        };
      });
      setNotifications(formatedData);
    });
  }, []);

  console.log(loading);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <AppHeader title={'Notifications'} />
      <BaseView
        loading={loading}
        styles={{
          flex: 1,
          paddingHorizontal: 15,
        }}>
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderRadius: 5,
                marginVertical: 5,
              }}>
              <Text style={{...FONTS.h3}}>{item?.title}</Text>
              <Text numberOfLines={1} style={{...FONTS.body4}}>
                {item?.body}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 40,
              }}>
              <Text>No Notifications</Text>
            </View>
          )}
        />
      </BaseView>
    </View>
  );
};
