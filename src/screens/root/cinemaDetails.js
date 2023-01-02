/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppHeader,
  CinemaCard,
  CinemaCastCard,
  AppTitleToggle,
  AppPlayer,
  BaseView,
} from '../../components';
import {COLORS} from '../../constants/theme';
import movies from '../../server/movies';
import moviesClient from '../../server/moviesConfig';
import {setInitialLoading, setMovieDetails} from '../../store/reducers/cinema';

export const CinemaDetailsScreen = ({route}) => {
  const {item, color} = route.params;
  const dispatch = useDispatch();
  const {movieDetails, initialLoading} = useSelector(state => state.cinema);
  const {coords} = useSelector(state => state.home);
  const [showCastCrew, setShowCastCrew] = React.useState(true);

  useEffect(() => {
    moviesClient.setHeader('lat_lng', coords);
    dispatch(setInitialLoading(true));
    dispatch(setMovieDetails(null));
    movies.filmDetails(item?.film_id).then(resp => {
      dispatch(setInitialLoading(false));
      if (!resp.ok) return toast.show('error');
      dispatch(setMovieDetails(resp.data));
    });
  }, []);

  return (
    <>
      <AppHeader
        title={item?.film_name}
        backButton
        color={color}
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
        {/* <CinemaHeader
          color={color}
          onPressBrandNew={() => SetSelectedTag("Brand New")}
          onPressUpcoming={() => SetSelectedTag("Upcoming")}
          onPressHorizontal={() => SetSelectedRotation("Horizontal")}
          onPressVertical={() => SetSelectedRotation("Vertical")}
          rotation={selectedRotation}
          active={selectedTag}
        /> */}
        <BaseView loading={initialLoading} styles={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {movieDetails?.trailers?.high[0].film_trailer ? (
              <AppPlayer
                url={movieDetails?.trailers?.high[0].film_trailer}
                artist={movieDetails?.film_name}
                poster={movieDetails?.trailers?.high[0].trailer_image}
                video_limit={0}
                limit_duration={0}
                shouldPlay={false}
                id={item.film_id}
                isBack={false}
              />
            ) : null}
            <CinemaCard color={color} item={movieDetails} />
            <View style={{marginTop: 10}}>
              <AppTitleToggle
                color={color}
                title="Cast & Crew"
                onPress={() => setShowCastCrew(!showCastCrew)}
                showDetails={showCastCrew}>
                <CinemaCastCard cast={movieDetails?.cast} />
              </AppTitleToggle>
            </View>
            {/* <View style={{ marginTop: 10 }}>
              <AppTitleToggle
                color={color}
                title="Show Time"
                onPress={() => setShowTime(!showTime)}
                showDetails={showTime}
                icon={icons.target}
              >
                <CinemaShowTime />
              </AppTitleToggle>
            </View> */}
          </ScrollView>
        </BaseView>
      </View>
    </>
  );
};
