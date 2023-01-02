import React from 'react';
import {Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../constants/theme';

export const GenreTitle = () => (
  <LinearGradient
    colors={[COLORS.primarydarker, COLORS.primarylighter]}
    style={styles.genre_wrapper}>
    <Text style={styles.genre_title}>Your favorite weekly genre</Text>
  </LinearGradient>
);

const styles = StyleSheet.create({
  genre_wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  genre_title: {
    ...FONTS.h3,
    letterSpacing: 0.3,
    color: COLORS.white,
    padding: 5,
  },
});
