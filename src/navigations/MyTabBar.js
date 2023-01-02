/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MotiImage, MotiText} from 'moti';
import icons from '../constants/icons';
import {COLORS, FONTS, SIZES} from '../constants/theme';

export function MyTabBar({state, descriptors, navigation}) {
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1}}
      locations={[0, 1]}
      colors={[COLORS.primarydarker, COLORS.primarylighter]}
      style={{
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        borderTopRightRadius: SIZES.tab_bar_radius,
        borderTopLeftRadius: SIZES.tab_bar_radius,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: SIZES.tab_bar_height,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        // custom icons for tab

        const icon =
          options.title === 'Home'
            ? 'home'
            : options.title === 'Recording'
            ? 'record'
            : options.title === 'Genre'
            ? 'genre'
            : 'demand';

        // get foucs event

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            android_ripple={{color: COLORS.lightGray, radius: 50}}
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 60,
            }}>
            <MotiImage
              animate={{
                scale: isFocused ? 1 : 0.8,
              }}
              transition={{
                type: 'timing',
              }}
              source={icons[icon]}
              style={[
                {
                  tintColor: isFocused
                    ? 'rgba(255,255,255,1)'
                    : 'rgba(255,255,255,0.5)',
                  height: 18,
                  width: 18,
                },
              ]}
            />
            <MotiText
              animate={{
                scale: isFocused ? 1 : 0.9,
              }}
              transition={{
                type: 'timing',
              }}
              numberOfLines={1}
              style={[
                {
                  color: isFocused
                    ? 'rgba(255,255,255,1)'
                    : 'rgba(255,255,255,0.5)',
                  ...FONTS.h4,
                  fontSize: 12,
                },
              ]}>
              {label}
            </MotiText>
          </Pressable>
        );
      })}
    </LinearGradient>
  );
}
