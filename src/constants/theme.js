import {Dimensions, Platform} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#f0923d',
  primary_light: '#f38759',
  primary_rgba: '238, 162, 63',
  primarydarker: '#f0923d',
  primarylighter: '#f7ad3d',
  secondary: '#f9aa33',
  red: '#db3a34',

  // colors

  black: '#1E1F20',
  white: '#FFFFFF',
  lightGray: '#EFF2F5',
  gray: '#8B9097',
  error: 'red',
  success: 'green',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  tab_bar_height: 60 + getBottomSpace(),
  tab_bar_radius: 20,

  //font sizezs
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,

  //app diementions
  width,
  height,
};

export const FONTS = {
  h1: {
    fontFamily: Platform.OS === 'android' ? 'Bold' : 'Arial',
    fontSize: SIZES.h1,
    lineHeight: 36,
  },
  h2: {
    fontFamily: Platform.OS === 'android' ? 'Bold' : 'Arial',
    fontSize: SIZES.h2,
    lineHeight: 30,
  },
  h3: {
    fontFamily: Platform.OS === 'android' ? 'Bold' : 'Arial',
    fontSize: SIZES.h3,
    lineHeight: 22,
  },
  h4: {
    fontFamily: Platform.OS === 'android' ? 'SemiBold' : 'Arial',
    fontSize: SIZES.h4,
    lineHeight: 22,
  },

  body1: {
    fontFamily: Platform.OS === 'android' ? 'Regular' : 'Arial',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: Platform.OS === 'android' ? 'Regular' : 'Arial',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: Platform.OS === 'android' ? 'Regular' : 'Arial',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: Platform.OS === 'android' ? 'Regular' : 'Arial',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: Platform.OS === 'android' ? 'Light' : 'Arial',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
