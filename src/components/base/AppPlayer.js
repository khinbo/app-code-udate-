// /* eslint-disable react-native/no-inline-styles */
// import React, {useContext, useEffect, useState} from 'react';
// import {View, TouchableOpacity, Text} from 'react-native';
// import VideoPlayer from 'react-native-video-player';

// import {COLORS, FONTS, SIZES} from '../../constants/theme';
// import video, {videoRef} from '../../refs/video';
// import helpers, {SUBSCRIBE} from '../../constants/helpers';
// import {Appicon} from './AppIcon';
// import icons from '../../constants/icons';
// import {useNavigation} from '@react-navigation/native';
// import server from '../../server';
// import AuthContext from '../../store/AuthContext';

// const percentageViewCount = 10;

// export const AppPlayer = ({
//   id,
//   url,
//   video_limit,
//   limit_duration,
//   artist,
//   poster,
//   shouldPlay = true,
//   isBack = true,
//   title,
//   isFullScreen = true,
//   type,
//   ...otherProps
// }) => {
//   const {user} = useContext(AuthContext);
//   const navigation = useNavigation();
//   const [fullScreen, setFullScreen] = useState(false);
//   const [viewLogged, setViewLogged] = useState(false);

//   if (!url) return null;

//   const limit = parseInt(limit_duration) * 1000;

//   const onPlayCallBack = async status => {
//     const {currentTime, seekableDuration} = status;

//     const playTime = currentTime * 1000;
//     const total_time = seekableDuration * 1000;

//     const percentagePlayed = Math.ceil((playTime / total_time) * 100);

//     if (!isNaN(percentagePlayed)) {
//       if (percentagePlayed > percentageViewCount && !viewLogged) {
//         setViewLogged(true);
//         server
//           .updateViews(id, {
//             collection: type === 'demands' ? 'demand' : 'media',
//           })
//           .then(resp => console.log(resp.data));
//       }
//     }

//     if (video_limit) {
//       if (helpers.checkSubsciption(user) === SUBSCRIBE) return;
//       if (playTime > limit) {
//         if (navigation.canGoBack()) {
//           video?.stopAsync();
//         }
//       }
//     }
//   };

// //   useEffect(() => {
// // alert(JSON.stringify(title))
// //   },[])

//   const FullScreen = () => {
//     setFullScreen(!fullScreen)
//     !isFullScreen
//   }

//   return (
//     <>
//     <View style={{flex: 1}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           padding: 10,
//           backgroundColor: COLORS.black,
//           position: 'absolute',
//           top: 0,
//           right: 0,
//           left: 0,
//           zIndex: 99,
//         }}>
//         {isBack ? (
//           <TouchableOpacity
//             activeOpacity={0.7}
//             onPress={() => {
//               if (navigation.canGoBack()) {
//                 video?.stopAsync();
//                 navigation.goBack();
//               }
//             }}>
//             <Appicon icon={icons.back} color={COLORS.white} />
//           </TouchableOpacity>
//         ) : null}
//         <Text
//           numberOfLines={1}
//           style={{
//             ...FONTS.h4,
//             paddingHorizontal: 10,
//             fontSize: 12,
//             color: COLORS.white,
//             flex: 1,
//           }}>
//           {artist}
//         </Text>
        
//         <TouchableOpacity
//         style={{alignSelf: 'flex-end'}}
//         onPress={() => FullScreen()}>
//         <Appicon icon={icons.full} color={COLORS.white} />
//       </TouchableOpacity>
//       </View>
//       <VideoPlayer
//         ref={videoRef}
//         video={{
//           uri: url,
//         }}
//         resizeMode={fullScreen ? 'cover' : 'contain'}
//         videoWidth={SIZES.width}
//         videoHeight={fullScreen ? SIZES.height : SIZES.width * 0.8}
//         thumbnail={{uri: helpers.getImage(poster)}}
//         autoplay={shouldPlay}
//         onProgress={onPlayCallBack}
//         style={{backgroundColor: COLORS.black,}}
//         {...otherProps}
//       />
//       <View
//         style={{
//           backgroundColor: COLORS.black,
//           paddingVertical: 5,
//           paddingHorizontal: 10,
//         }}>
//           <TouchableOpacity
//             style={{alignSelf: 'flex-end'}}
//             onPress={() => {FullScreen()}}>
//             <Appicon icon={icons.full} color={COLORS.white} />
//           </TouchableOpacity>
        
//       </View>
//       </View>
//     </>
//   );
// };

import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import VideoPlayer from 'react-native-video-player';

import {COLORS, FONTS, SIZES} from '../../constants/theme';
import video, {videoRef} from '../../refs/video';
import helpers, {SUBSCRIBE} from '../../constants/helpers';
import {Appicon} from './AppIcon';
import icons from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';
import server from '../../server';
import AuthContext from '../../store/AuthContext';
import { useSelector } from 'react-redux';

const percentageViewCount = 10;

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
  const {hasLiked, likes, contents} = useSelector(state => state.player);

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
          .then(resp => console.log(resp.data));
      }
    }

    if (video_limit) {
      if (helpers.checkSubsciption(user) === SUBSCRIBE) return;
      if (playTime > limit) {
        if (navigation.canGoBack()) {
          video?.stopAsync();
        }
      }
    }
  };
  const [orientation, setOrientation] = useState('PORTRAIT')
  const isPortrait = () => {
    const dim = Dimensions.get('window');
    return dim;
}

useEffect(() => {
  console.log("new array is",contents);
  const callback = () => setOrientation(isPortrait() ? 'PORTRAIT' : 'LANDSCAPE');

  Dimensions.addEventListener('change', callback);

  return () => {
    Dimensions.removeEventListener('change', callback);
  };
}, []);


  // const nextVideo =() =>{
  //   for (let i = 0; i < contents.length; i++) {

  //     alert(JSON.stringify(i))
  //   }
  // }

  // const  ScreenRotation = () => {
  //   if (orientation === 'potrait') {
  //     getScreenInfo()
  //     setFullScreen(fullScreen)
  //   } else if (orientation  === 'landscape') {
  //     setFullScreen(!fullScreen)
  //   }
  // }
  const rotateScreen = () => {
    if (orientation === 'POTRAIT') {
      setFullScreen(fullScreen)
    } else {
      isPortrait()
      setFullScreen(!fullScreen)
    }
  }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: COLORS.black,
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          zIndex: 99,
        }}>
        {isBack ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (navigation.canGoBack()) {
                video?.stopAsync();
                navigation.goBack();
              }
            }}>
            <Appicon icon={icons.back} color={!fullScreen ? COLORS.white : COLORS.black} />
          </TouchableOpacity>
        ) : null}
        {!fullScreen &&  (
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
        </Text>)}
        { (
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => setFullScreen(!fullScreen)}>
            <Appicon icon={icons.full} color={fullScreen ?  COLORS.white : COLORS.black } />
          </TouchableOpacity>
        ) }
      </View>
      <VideoPlayer
        ref={videoRef}
        video={{
          uri: url,
        }}
        resizeMode={fullScreen ? 'none' : 'contain'}
        videoWidth={fullScreen ? SIZES.width *1  : SIZES.width * 0.8 }
        videoHeight={fullScreen ? SIZES.height * 1  : SIZES.width * 0.8}
        thumbnail={{uri: helpers.getImage(poster)}}
        autoplay={shouldPlay}
        onProgress={onPlayCallBack}
        style={{backgroundColor: COLORS.black, 
         transform: [{ rotate: fullScreen ?  SIZES.height * 1 > SIZES.width ? '90deg' : '0deg': 
          SIZES.height * 1 > SIZES.width ? '0deg' : '90deg'}] }}
        {...otherProps}
        
      />
      <View
        style={{
          backgroundColor: COLORS.black,
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => rotateScreen()}>
            <Appicon icon={icons.full} color={COLORS.white} />
          </TouchableOpacity>
        
      </View>
    </>
  );
};