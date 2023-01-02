import React from 'react';
import {MotiImage} from 'moti';
import {COLORS} from '../../constants/theme';
import helpers from '../../constants/helpers';

export const Appicon = ({
  icon,
  color = COLORS.black,
  orgColor,
  size = 20,
  borderRadius,
  url,
  animate,
}) => {
  return (
    <MotiImage
      animate={animate}
      transition={{
        type: 'timing',
      }}
      source={url ? {uri: helpers.getImage(icon)} : icon}
      style={{
        height: size,
        width: size,
        tintColor: orgColor ? null : color,
        borderRadius: borderRadius,
        zIndex: 11,
      }}
    />
  );
};
