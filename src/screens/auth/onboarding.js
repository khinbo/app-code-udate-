import React from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {AppButton} from '../../components';
import slides from '../../constants/slides';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

export const Onboarding = ({navigation}) => {
  const scrollX = new Animated.Value(0);

  // Render

  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        bounces={false}
        snapToInterval={Dimensions.get('window').width}
        scrollEventThrottle={16}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {slides.map((slide, index) => (
          <View
            key={index}
            style={{
              height: SIZES.height,
              width: SIZES.width,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('signup')}
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingRight: 20,
                height: 45,
              }}>
              <Text style={{color: COLORS.error, ...FONTS.body2}}>Skip</Text>
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <Image
                source={slide.image}
                style={{height: '100%', width: '100%'}}
              />
            </View>
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  margin: 10,
                  alignItems: 'center',

                  flex: 1,
                }}>
                <Text
                  style={{
                    ...FONTS.h2,
                    textAlign: 'center',
                    color: COLORS.black,
                    marginTop: 10,
                  }}>
                  {slide.title}
                  <Text style={{color: COLORS.primarydarker}}>
                    {slide.HeighLightWord}
                  </Text>
                </Text>
                <Text
                  style={{
                    ...FONTS.body3,
                    textAlign: 'center',
                    color: COLORS.gray,
                    marginTop: 20,
                  }}>
                  {slide.subTitle}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={{flexDirection: 'row'}}>
        {slides.map((_, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 17, 10],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                width: dotSize,
                height: dotSize,
                marginHorizontal: SIZES.radius / 2,
                opacity,
              }}></Animated.View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {renderContent()}
      <View
        style={{
          width: '100%',
          paddingHorizontal: 10,
          alignItems: 'center',
          marginBottom: 10,

          position: 'absolute',
          bottom: SIZES.height > 700 ? 30 : 20,
          alignSelf: 'center',
        }}>
        {renderDots()}
        <AppButton
          title="Sign up"
          onPress={() => navigation.navigate('signup')}
        />
      </View>
    </View>
  );
};
