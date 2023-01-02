import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import icons from '../../constants/icons';
import {COLORS, FONTS} from '../../constants/theme';
import {Appicon} from '../base/AppIcon';

const RenderTags = ({title}) => {
  return (
    <View
      style={{
        paddingHorizontal: 5,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
        marginRight: 5,
      }}>
      <Text style={{...FONTS.body4, fontSize: 11, color: COLORS.gray}}>
        {title}
      </Text>
    </View>
  );
};
export const CinemaCard = ({color, height = 220, item, onPressMovieCard}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPressMovieCard}
      style={{
        height: height,
        backgroundColor: COLORS.lightGray,
        overflow: 'hidden',
        flexDirection: 'row',
        paddingVertical: 5,
      }}>
      <View
        style={{
          flex: 1,
          height: '100%',
          // alignItems: "center",
        }}>
        <View
          style={{
            borderRadius: 5,
            overflow: 'hidden',
            backgroundColor: COLORS.gray,
            width: '90%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {item?.images.poster['1']?.medium?.film_image ? (
            <Image
              source={{uri: item.images.poster['1']?.medium?.film_image}}
              style={{width: '100%', height: '100%'}}
            />
          ) : (
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                fontSize: 10,
                letterSpacing: 2,
              }}>
              No Poster
            </Text>
          )}
        </View>
      </View>

      {/* CONTENT DETAILS  */}

      <View style={{flex: 1.2, justifyContent: 'space-evenly'}}>
        {/* CONTENT TITLE  */}
        <Text numberOfLines={2}>
          <Text
            style={{
              ...FONTS.h4,
              lineHeight: 19,
              color,
            }}>
            {item?.film_name}
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              fontSize: 12,
              color: COLORS.gray,
            }}>
            {' '}
            (
            {item?.duration_mins
              ? item.duration_mins + ' min'
              : item?.release_dates[0].release_date}
            )
          </Text>
        </Text>
        {/* CONTENT RATING  */}
        {item?.review_stars !== undefined ? (
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Appicon icon={icons.like} size={15} />
            <Text style={{...FONTS.body4, fontSize: 12, marginLeft: 10}}>
              <Text>{item?.review_stars}</Text>
              {/* <Text>/</Text>
              <Text>10</Text> */}
            </Text>
          </View>
        ) : null}
        {/* AGE RATING  */}
        <View
          style={{
            flexDirection: 'row',
            marginRight: 50,
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item?.age_rating[0]?.age_rating_image}}
            style={{height: 30, width: 30, marginRight: 5}}
          />
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.body4,
              fontSize: 10,
              lineHeight: 15,
              marginRight: 10,
            }}>
            {item?.age_rating[0]?.age_advisory}
          </Text>
        </View>
        {/* CONTENT TAGS  */}
        <View style={{flexDirection: 'row'}}>
          {item?.genres !== undefined
            ? item.genres.map(tag => (
                <RenderTags title={tag?.genre_name} key={tag?.genre_id} />
              ))
            : null}
        </View>
        {/* CONTENT INFO */}
        <View style={{marginTop: 2}}>
          <Text
            numberOfLines={5}
            style={{...FONTS.body4, fontSize: 11, lineHeight: 16}}>
            {item?.synopsis_long}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
