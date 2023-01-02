/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Appicon} from '../base/AppIcon';
import {COLORS, FONTS} from '../../constants/theme';

export const AppTitleToggle = ({
  color,
  title,
  onPress,
  showDetails = false,
  children,
  icon,
}) => {
  return (
    <>
      <LinearGradient
        colors={[
          color ? color : COLORS.primarydarker,
          color ? color : COLORS.primarylighter,
        ]}
        style={{
          overflow: 'hidden',
          padding: 6,
          borderRadius: 5,
        }}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.white,
              }}>
              {title}
            </Text>
            {icon && <Appicon icon={icon} color={COLORS.white} />}
          </View>
        </TouchableWithoutFeedback>
      </LinearGradient>

      {showDetails && children}
    </>
  );
};
