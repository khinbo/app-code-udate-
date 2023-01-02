import React from 'react';
import {Image, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import icons from '../../constants/icons';
import {COLORS} from '../../constants/theme';

export const AppSearch = ({onChangeText, value, placeholder}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        height: 50,
        zIndex: 99,
      }}>
      <View
        style={{
          height: 45,
          backgroundColor: COLORS.white,
          position: 'absolute',
          bottom: -23,
          width: '85%',
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderRadius: 5,
        }}>
        <Image
          source={icons.magnifier}
          style={{height: 20, width: 20, marginHorizontal: 10}}
        />
        <TextInput
          onChangeText={onChangeText}
          value={value}
          style={{
            flex: 1,
          }}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};
