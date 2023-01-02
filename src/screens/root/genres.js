import React, {useEffect} from 'react';
import {AppHeader, AppScrollView, BaseView, RegionCard} from '../../components';
import {COLORS} from '../../constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {getGenres, setIsRefresh} from '../../store/reducers/genre';
import {translate} from '../../I18n';

export const GenresScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {genres, initialLoading, refresh} = useSelector(state => state.genre);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  return (
    <>
      <AppHeader title={translate('genresTitle')} shadow={false} />
      <BaseView
        styles={{flex: 1, backgroundColor: COLORS.white}}
        loading={initialLoading}>
        <AppScrollView
          refreshing={refresh}
          onRefresh={() => {
            dispatch(setIsRefresh(true));
            dispatch(getGenres());
          }}
          data={genres}
          renderItems={region => (
            <RegionCard
              region={region}
              key={region.id}
              onPressGenre={item =>
                navigation.navigate('genre', {
                  item: item,
                })
              }
            />
          )}
        />
      </BaseView>
    </>
  );
};
