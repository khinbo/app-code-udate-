/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Pressable, Image, ScrollView, Platform} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {AppHeader, AppSwitch, SettingList} from '../../components';
import icons from '../../constants/icons';
import images from '../../constants/images';
import {COLORS, FONTS} from '../../constants/theme';

export const SettingsScreen = () => {
  const [selectedVolume, setSelectedVolume] = React.useState();
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [dataSaver, setIsDataSaver] = React.useState(false);
  const pickerRef = React.useRef();

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleDataSaver = () => setIsDataSaver(previousState => !previousState);

  function renderAccount() {
    return (
      <Pressable
        android_ripple={{color: 'rgba(0,0,0,0.1)'}}
        style={({pressed}) => [
          {
            opacity: pressed ? (Platform.OS === 'ios' ? 0.7 : 1) : 1,
          },
          {
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.lightGray,
            marginTop: 5,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
          }}>
          <Image
            source={images.dp}
            style={{height: 50, width: 50, borderRadius: 25, marginRight: 10}}
          />
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                ...FONTS.h4,
                lineHeight: 22,
              }}>
              William S.Jones
            </Text>
            <Text
              style={{
                ...FONTS.body5,
                fontSize: 10,
                lineHeight: 13,
              }}>
              View Profile
            </Text>
          </View>
          <Image
            source={icons.chevron}
            style={{
              height: 18,
              width: 18,
              tintColor: COLORS.gray,
              marginRight: 5,
            }}
          />
        </View>
      </Pressable>
    );
  }

  function renderVolume() {
    return (
      <View
        style={{
          padding: 15,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.lightGray,
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.black,
            marginTop: 10,
            fontSize: 12,
          }}>
          Volume
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 3,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.black,
              }}>
              Volume level
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                fontSize: 9,
                lineHeight: 12,
                color: COLORS.gray,
              }}>
              Ajdust the volume for the app
            </Text>
          </View>
          <View
            style={{
              width: 120,
            }}>
            <Picker
              mode="dropdown"
              itemStyle={{
                fontSize: 10,
                height: 50,
              }}
              ref={pickerRef}
              selectedValue={selectedVolume}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedVolume(itemValue)
              }>
              <Picker.Item label="Normal" value="normal" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Low" value="low" />
            </Picker>
          </View>
        </View>
        <AppSwitch
          value={isEnabled}
          onValueChange={toggleSwitch}
          title="Normalize volume"
          subtitle="set the same volume level for all the tracks and videos"
        />
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <AppHeader title={'Settings'} backButton />
      <ScrollView style={{flex: 1}}>
        {renderAccount()}
        {renderVolume()}
        <SettingList title="Notifications" />
        <View
          style={{
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.lightGray,
          }}>
          <AppSwitch
            value={dataSaver}
            onValueChange={toggleDataSaver}
            title="Data saver"
            subtitle="only play on while listening Live or on replay"
          />
        </View>
        <SettingList
          title="Terms And Conditions"
          subtitle="all you need to know"
        />
        <SettingList
          title="Privacy Policy"
          subtitle="important to both of us"
        />
        <SettingList title="Support" subtitle="contact us as you need" />
        <Text
          style={{
            ...FONTS.h3,
            padding: 15,
            color: COLORS.gray,
          }}>
          Version:{' '}
          <Text
            style={{
              fontSize: 12,
            }}>
            {' '}
            1.0.0{' '}
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};
