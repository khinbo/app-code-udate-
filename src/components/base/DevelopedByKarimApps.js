import React from 'react';
import {TouchableOpacity, Text, Linking} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';

const DevelopedByKarimApps = () => {
  const handleLinkPress = () => {
    Linking.openURL('http://www.karimapps.com');
  };

  return (
    <TouchableOpacity
      style={{marginTop: 10}}
      activeOpacity={0.7}
      onPress={handleLinkPress}>
      <Text style={{...FONTS.h3, textDecorationLine: 'underline'}}>
        Developed by <Text style={{color: COLORS.primary}}>Karimapps</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default DevelopedByKarimApps;
