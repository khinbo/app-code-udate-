/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';
import {AnimatePresence, MotiView} from 'moti';
import helpers, {FREE, SUBSCRIBE, UNSUBSCRIBE} from '../../constants/helpers';
import AuthContext from '../../store/AuthContext';
import {useNavigation} from '@react-navigation/native';

export const DemandList = ({
  item,
  isNotAlign,
  lastRaw,
  total,
  onPressDemond,
}) => {
  const navigation = useNavigation();
  const EXTRA_HEIGHT = total === 4 ? 120 : total <= 5 ? 100 : 80;
  const HEIGHT = total === 4 ? 240 : total <= 5 ? 200 : 160;
  const FEATURED_HEIGHT = HEIGHT + EXTRA_HEIGHT;
  const CARD_HEIGHT = item?.is_featured ? FEATURED_HEIGHT + 4 : HEIGHT;

  const {user} = useContext(AuthContext);

  function getHeight() {
    return total === 5
      ? CARD_HEIGHT
      : isNotAlign
      ? CARD_HEIGHT + (HEIGHT * lastRaw - EXTRA_HEIGHT * lastRaw + 4 * lastRaw)
      : CARD_HEIGHT;
  }

  function isValid() {
    if (
      helpers.checkSubsciption(user?.is_subscribed) === SUBSCRIBE &&
      helpers.checkSubsciption(user?.is_subscribed) !== FREE
    ) {
      return true;
    }

    if (helpers.checkSubsciption(user?.is_subscribed) === UNSUBSCRIBE) {
      return false;
    }

    if (item?.type === 'art') {
      if (helpers.checkSubsciption(user?.is_subscribed) === FREE) {
        return true;
      }
    }
    if (item?.type === 'literature') {
      if (helpers.checkSubsciption(user?.is_subscribed) === FREE) {
        return true;
      }
    }
    return false;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        if (!isValid()) {
          navigation.navigate('plans');
        } else {
          onPressDemond(item);
        }
      }}
      activeOpacity={0.7}
      style={{
        flex: 1,
        margin: 2,
        backgroundColor: COLORS.lightGray,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        opacity: !isValid() ? 0.5 : 1,
      }}>
      <AnimatePresence exitBeforeEnter>
        <MotiView
          from={{scaleX: 0, opacity: 0}}
          animate={{
            scaleX: 1,
            opacity: 1,
          }}
          exit={{
            scaleX: 0,
            opacity: 0,
          }}
          transition={{
            type: 'timing',
          }}>
          <Image
            source={{uri: helpers.getImage(item?.img)}}
            style={{
              height: getHeight(),
              alignSelf: 'stretch',
              borderRadius: 10,
            }}
            resizeMode="cover"
          />

          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              position: 'absolute',
              zIndex: 10,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              justifyContent: 'flex-end',
              borderRadius: 10,
            }}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.h4,
                fontSize: 12,
                lineHeight: 17,
                color: COLORS.white,
                textAlign: 'center',
                padding: 5,
              }}>
              {item.title}
            </Text>
          </View>
        </MotiView>
      </AnimatePresence>
    </TouchableOpacity>
  );
};
