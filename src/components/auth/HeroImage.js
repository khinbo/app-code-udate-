/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import images from '../../constants/images';

export const HeroImage = ({height}) => {
  return (
    <View style={{height: height, overflow: 'hidden'}}>
      <Image
        source={images.logo_two}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </View>
  );
};
