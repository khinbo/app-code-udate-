/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Appicon} from './AppIcon';
import icons from '../../constants/icons';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import helpers, {FREE, SUBSCRIBE, UNSUBSCRIBE} from '../../constants/helpers';
import {useDispatch} from 'react-redux';
import {onContentViewHandler} from '../../store/reducers/player';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../../store/AuthContext';

export const AppMovieCard = ({
  movie,
  CARD_WIDTH = SIZES.width / 2.5,
  height = 0,
}) => {
  const dispatch = useDispatch();
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  // useEffect(() =>{
  //   alert(JSON.stringify(movie))
  // },[])

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

    return false;
  }

  const onPressMedia = () => {
    if (!isValid()) {
      navigation.navigate('plans');
    } else {
      movie?.video_url
        ? dispatch(onContentViewHandler({item: movie, type: 'demands'}))
        : navigation.navigate('artDetails', {
            art: movie,
            color: COLORS.primary,
          });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPressMedia}
      style={{
        marginRight: 10,
        width: CARD_WIDTH,
        opacity: !isValid() ? 0.5 : 1,
      }}>
      <View
        style={{
          height: CARD_WIDTH + height,
          width: CARD_WIDTH,
          borderRadius: 5,
          overflow: 'hidden',
          backgroundColor: COLORS.gray,
        }}>
        {movie?.video_url && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Appicon icon={icons.play_new} color={COLORS.white} size={40} />
          </View>
        )}
        <Image
          source={{
            uri: helpers.getImage(movie.poster),
          }}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>

      <Text
        numberOfLines={1}
        style={{
          ...FONTS.h2,
          fontSize: 12,
          lineHeight: 16,
          textAlign: 'center',
          marginTop: 3,
        }}>
        {movie?.title}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          ...FONTS.body4,
          textAlign: 'center',
          fontSize: 10,
          lineHeight: 16,
          color: COLORS.gray,
        }}>
        {movie?.artist}
      </Text>
    </TouchableOpacity>
  );
};
