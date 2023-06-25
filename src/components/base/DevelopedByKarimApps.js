import React from 'react';
import {TouchableOpacity, Linking, Image} from 'react-native';

const DevelopedByKarimApps = () => {
  const handleLinkPress = () => {
    Linking.openURL('https://mypromax.com');
  };

  return (
    <TouchableOpacity
      style={{marginTop: 10}}
      activeOpacity={0.7}
      onPress={handleLinkPress}>
      <Image source={require('../../assets/mypromax.png')} />
    </TouchableOpacity>
  );
};

export default DevelopedByKarimApps;
