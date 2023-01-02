import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppCover,
  AppFlatList,
  AppHeader,
  BaseView,
  ItemList,
} from '../../components';
import {AppNoDataFound} from '../../components/base/AppNoData';
import {COLORS, SIZES} from '../../constants/theme';
import {getGenreContents, loadMoreContents} from '../../store/reducers/genre';
import {onContentViewHandler} from '../../store/reducers/player';

const headerHeight = SIZES.width / 1.8;
const itemHeight = 80;

export const GenreScreen = ({navigation, route}) => {
  const {item} = route.params;
  const dispatch = useDispatch();
  const {contents, refresh, featured, loadMore, loading} = useSelector(
    state => state.genre,
  );

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     getContents();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    const unsubscribe = getContents();
    return unsubscribe;
  }, []);

  const getContents = () => {
    dispatch(getGenreContents(item?.id));
  };

  return (
    <>
      <AppHeader title={item?.title.toUpperCase()} backButton shadow={false} />
      <BaseView styles={styles.container} loading={loading}>
        <View style={{flex: 1, marginTop: 5}}>
          <AppFlatList
            contentContainerStyle={{
              paddingBottom: SIZES.tab_bar_height,
            }}
            ListHeaderComponent={() => (
              <AppCover featured={featured} height={headerHeight} />
            )}
            data={contents}
            keyExtractor={item => item?.id.toString()}
            renderItem={({item}) => (
              <ItemList
                item={item}
                height={itemHeight}
                onPressItem={item =>
                  dispatch(onContentViewHandler({item, type: 'media'}))
                }
              />
            )}
            refreshing={refresh}
            onRefresh={getContents}
            renderEmpty={() => <AppNoDataFound />}
            onEndReachedThreshold={0.1}
            headerHeight={featured ? headerHeight : 0}
            itemHeight={itemHeight + 1}
            onEndReached={() => dispatch(loadMoreContents(item?.id))}
            loadMore={loadMore}
          />
        </View>
      </BaseView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
  },
});
