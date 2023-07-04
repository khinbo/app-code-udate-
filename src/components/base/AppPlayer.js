/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Alert, BackHandler, Text} from 'react-native';
// import VideoPlayer from 'react-native-video-player';
import Orientation from 'react-native-orientation-locker';
import {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';

import {COLORS, FONTS, SIZES} from '../../constants/theme';
import video, {videoRef} from '../../refs/video';
import helpers, {SUBSCRIBE} from '../../constants/helpers';
import {Appicon} from './AppIcon';
import icons from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';
import server from '../../server';
import AuthContext from '../../store/AuthContext';
import {translate} from '../../I18n';
import VideoPlayer from './VideoPlayer';

const percentageViewCount = 10;

const playerWidth = SIZES.width;
const PlayerHeight = SIZES.width / 1.7777777;

export const AppPlayer = ({
  id,
  url,
  video_limit,
  limit_duration,
  artist,
  poster,
  shouldPlay = true,
  isBack = true,
  isFullScreen = false,
  type,
  landscape,
  ...otherProps
}) => {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const [fullScreen, setFullScreen] = useState(false);
  const [viewLogged, setViewLogged] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  if (!url) return null;

  const limit = parseInt(limit_duration) * 1000;

  const onPlayCallBack = async status => {
    const {currentTime, seekableDuration} = status;
    const playTime = currentTime * 1000;
    const total_time = seekableDuration * 1000;

    const percentagePlayed = Math.ceil((playTime / total_time) * 100);

    if (!isNaN(percentagePlayed)) {
      if (percentagePlayed > percentageViewCount && !viewLogged) {
        setViewLogged(true);
        server
          .updateViews(id, {
            collection: type === 'demands' ? 'demand' : 'media',
          })
          .then(resp => console.log(resp.data, 'view function'));
      }
    }

    if (video_limit) {
      if (helpers.checkSubsciption(user) === SUBSCRIBE) return;
      if (playTime > limit) {
        video?.stopAsync();
      }
    }
  };

  const backAction = () => {
    Alert.alert(translate('holdOn'), translate('youWantToGoBack'), [
      {
        text: translate('cancel'),
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: translate('yes'),
        onPress: async () => {
          if (navigation.canGoBack()) {
            console.log('oncancel');
            Orientation.getOrientation(status => {
              if (status !== 'PORTRAIT') Orientation.lockToPortrait();
            });
            video?.stopAsync();
            setTimeout(() => {
              navigation.goBack();
            }, 1000);
          }
        },
      },
    ]);
    return true;
  };

  return (
    <>
      <VideoPlayer
        videoUrl={url}
        videoWidth={playerWidth}
        videoHeight={PlayerHeight}
        thumbnailUrl={{uri: helpers.getImage(poster)}}
        autoplay={shouldPlay}
        onPlayCallBack={onPlayCallBack}
        isBack={isBack}
        artist={artist}
        backAction={backAction}
        {...otherProps}
      />

      {/* <View
        style={{
          backgroundColor: COLORS.black,
          paddingVertical: 5,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{marginRight: 20}}
          onPress={() =>
            setResizeMode(resizeMode === 'contain' ? 'stretch' : 'contain')
          }>
          <Appicon icon={icons.expend} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={() => rotateScreen(true)}>
          <Appicon icon={icons.full} color={COLORS.white} />
        </TouchableOpacity>
      </View> */}
    </>
  );
};
