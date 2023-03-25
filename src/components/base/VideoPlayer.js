/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import MediaControls, {PLAYER_STATES} from 'react-native-video-basic-controls';
import video, {videoRef} from '../../refs/video';
import {Appicon} from './AppIcon';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import icons from '../../constants/icons';

const {height, width} = Dimensions.get('window');

const VideoPlayer = ({
  thumbnailUrl,
  videoUrl,
  onPlayCallBack = () => {},
  backAction = () => {},
  isBack,
  autoplay,
  artist,
}) => {
  const [buffer, setBuffer] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferValue, setBufferValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [fullscreen, setFullscreen] = useState(false);
  const [resizeMode, setResizeMode] = useState('contain');
  const [playerWidth, setPlayerWidth] = useState(width);
  const [PlayerHeight, setPlayerHeight] = useState(width / 1.7777777);

  const viewRef = useRef();

  const onPaused = pState => {
    setPaused(!paused);
    setPlayerState(pState);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    video.seek(0);
  };

  const onSeek = seek => {
    video.seek(seek);
  };

  const onSeeking = currentT => setCurrentTime(currentT);

  const rotateScreen = isFullMode => {
    setFullscreen(isFullMode);
    if (isFullMode) {
      setPlayerWidth(
        Platform.select({
          android: SIZES.height,
          ios: SIZES.height - 40,
        }),
      );
      setPlayerHeight(SIZES.width);

      Orientation.lockToLandscapeLeft();
      hideNavigationBar();
    } else {
      setPlayerWidth(SIZES.width);
      setPlayerHeight(SIZES.width / 1.7777777);
      Orientation.lockToPortrait();
      showNavigationBar();
    }
  };
  const verticalFullScreen = () => {
    const isNotFullMode =
      playerWidth === width && PlayerHeight === SIZES.width / 1.7777777;
    if (fullscreen) {
      setFullscreen(false);
      setPlayerWidth(SIZES.width);
      setPlayerHeight(SIZES.height * 1.1);
      hideNavigationBar();
    } else if (isNotFullMode) {
      setPlayerWidth(SIZES.width);
      setPlayerHeight(SIZES.height * 1.1);
      hideNavigationBar();
    } else {
      setPlayerWidth(SIZES.width);
      setPlayerHeight(SIZES.width / 1.7777777);
      showNavigationBar();
    }
    Orientation.lockToPortrait();
  };

  return (
    <View
      ref={viewRef}
      style={{
        width: playerWidth,
        height: PlayerHeight,
      }}>
      <Video
        ref={videoRef}
        source={{
          uri: videoUrl,
          //   uri: convertToCache(videoUrl),
        }}
        autoplay={autoplay}
        style={styles.videoSty}
        poster={thumbnailUrl?.uri}
        resizeMode={resizeMode}
        onLoadStart={() => setIsLoading(true)}
        onLoad={data => {
          setDuration(data.duration);
          setIsLoading(false);
        }}
        onProgress={data => {
          bufferValue !== data.playableDuration
            ? setBufferValue(data.playableDuration)
            : null;
          setCurrentTime(data.currentTime);
          onPlayCallBack(data);
        }}
        paused={paused}
        onEnd={() => {
          //   setPlayerState(PLAYER_STATES.ENDED);
        }}
        onBuffer={e => {
          console.log(e);
          e.isBuffering ? setIsLoading(true) : setIsLoading(false);
          if (buffer !== e.isBuffering) {
            // video.seekTo(currentTime, 30);
          }
          setBuffer(e.isBuffering);
        }}
        onError={e => {
          // console.log(e);
          // setState({ error: e })
        }}
      />

      <MediaControls
        bufferValue={bufferValue}
        duration={duration}
        isLoading={isLoading}
        mainColor="red"
        // bufferColor=""
        sliderStyle={{
          thumbStyle: {
            width: 15,
            height: 15,
          },
          trackStyle: {
            height: 2,
          },
          containerStyle: {},
        }}
        fullScreenIconP={<Appicon icon={icons.full} color={COLORS.white} />}
        fullScreenIconL={<Appicon icon={icons.full} color={COLORS.white} />}
        onPaused={itm => onPaused(itm)}
        onReplay={() => onReplay()}
        onSeek={itm => onSeek(itm)}
        onSeeking={itm => onSeeking(itm)}
        playerState={playerState}
        progress={currentTime}
        onSkipFor={() => video.seekTo(currentTime + 5, 30)}
        onSkipBack={() => video.seekTo(currentTime - 5, 30)}
        showVolume={true}
        showBrightness={false}
        sliderType="Slider"
        toolbarStyle={{}}
        // VSliderOuterStyles={{marginHorizontal: 40}}
        // VSliderInnerStyles={{}}
        onFullScreen={() => {
          rotateScreen(!fullscreen);
        }}

        // sliderScale
      >
        <MediaControls.Toolbar>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.01)',
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              zIndex: 99,
              justifyContent: 'space-between',
            }}>
            {isBack ? (
              <TouchableOpacity activeOpacity={0.7} onPress={backAction}>
                <Appicon icon={icons.back} color={COLORS.white} />
              </TouchableOpacity>
            ) : null}
            {!fullscreen && (
              <Text
                numberOfLines={1}
                style={{
                  ...FONTS.h4,
                  paddingHorizontal: 10,
                  fontSize: 12,
                  color: COLORS.white,
                  flex: 1,
                }}>
                {artist}
              </Text>
            )}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity onPress={verticalFullScreen}>
                <Appicon icon={icons.expend} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        </MediaControls.Toolbar>
      </MediaControls>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  videoSty: {
    width: '100%',
    height: '100%',
  },
});

export default VideoPlayer;
