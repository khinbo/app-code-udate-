/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppFlatList,
  AppHeader,
  BaseView,
  CinemaCard,
  CinemaHeader,
} from '../../components';
import {AppNoDataFound} from '../../components/base/AppNoData';
import {COLORS} from '../../constants/theme';
import movies from '../../server/movies';
import moviesClient from '../../server/moviesConfig';
import {
  setBrandNewMovies,
  setInitialLoading,
} from '../../store/reducers/cinema';
import toast from '../../toast';

const cardHeight = 220;

export const CinemaScreen = ({navigation, route}) => {
  const {item} = route.params;

  const dispatch = useDispatch();
  const [selectedRotation, SetSelectedRotation] = useState();
  const [selectedTag, SetSelectedTag] = useState('filmsNowShowing');
  const {coords} = useSelector(state => state.home);
  const {brandNewMovies, initialLoading} = useSelector(state => state.cinema);

  const color = item?.color;

  useEffect(() => {
    moviesClient.setHeader('lat_lng', coords);
    dispatch(setInitialLoading(true));
    dispatch(setBrandNewMovies([]));
    movies[selectedTag](50).then(resp => {
      dispatch(setInitialLoading(false));
      if (!resp.ok) return toast.show('error');
      dispatch(setBrandNewMovies(resp.data?.films ?? []));
    });
  }, [selectedTag]);

  return (
    <>
      <AppHeader
        title={item.title.toUpperCase()}
        backButton
        color={item?.color}
        shadow={false}
        otherStyles={{
          backgroundColor: COLORS.lightGray,
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.lightGray,
          paddingHorizontal: 15,
        }}>
        <CinemaHeader
          color={item.color}
          onPressBrandNew={() => SetSelectedTag('filmsNowShowing')}
          onPressUpcoming={() => SetSelectedTag('filmsComingSoon')}
          onPressHorizontal={() => SetSelectedRotation('Horizontal')}
          onPressVertical={() => SetSelectedRotation('Vertical')}
          rotation={selectedRotation}
          active={selectedTag}
        />
        <BaseView
          styles={{
            flex: 1,
            backgroundColor: COLORS.lightGray,
          }}
          loading={initialLoading}>
          {/* <CinemaCover color={item.color} /> */}
          <AppFlatList
            contentContainerStyle={{paddingBottom: 5, marginTop: 10}}
            data={brandNewMovies}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?.film_id.toString()}
            renderItem={({item}) => (
              <CinemaCard
                color={item.color}
                height={cardHeight}
                item={item}
                onPressMovieCard={() =>
                  navigation.navigate('cinemaDetails', {
                    item,
                    color,
                  })
                }
              />
            )}
            renderEmpty={() => <AppNoDataFound />}
            itemHeight={cardHeight + 1}
            refreshing={false}
            loadMore={false}
          />
        </BaseView>
      </View>
    </>
  );
};
