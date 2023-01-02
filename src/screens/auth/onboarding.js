import React from 'react';
import {View, Text, Image, Animated, Dimensions} from 'react-native';
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
          <View key={index} style={{height: SIZES.height, width: SIZES.width}}>
            <View style={{flex: 2}}>
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
                  margin: 30,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text
                  style={{
                    ...FONTS.body2,
                    textAlign: 'center',
                    color: 'rgba(0,0,0,0.6)',
                  }}>
                  {slide.title}
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
          width: '70%',
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
