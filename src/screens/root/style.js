/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppContentList,
  AppCover,
  AppFlatList,
  AppHeader,
  AppMiniButton,
  BaseView,
  StyleTags,
} from '../../components';
import {AppNoDataFound} from '../../components/base/AppNoData';
import {COLORS, SIZES, FONTS} from '../../constants/theme';
import {
  getDemandDefaultIndex,
  loadMoreDemandContents,
  onSelectCategory,
  OnSelecteSubCategory,
  setRefresh,
  setSelectedCategory,
  setSelectedSubCategory,
} from '../../store/reducers/demand';
import {onContentViewHandler} from '../../store/reducers/player';

const headerHeight = 30;
const itemHeight = 100;
const coverHeight = SIZES.width / 2;

export const StyleScreen = ({route, navigation}) => {
  const {item} = route.params;

  const dispatch = useDispatch();

  const {
    initialLoading,
    contents,
    categories,
    subCategories,
    selectedCategory,
    selectedSubCategory,
    loadMore,
    loading,
    refresh,
    featured,
  } = useSelector(state => state.demand);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     dispatch(getDemandDefaultIndex(item?.id));
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    dispatch(getDemandDefaultIndex(item?.id));
  }, []);

  useEffect(() => {
    if (selectedSubCategory) {
      dispatch(
        OnSelecteSubCategory({id: selectedSubCategory, type: 'category'}),
      );
    }
  }, [selectedSubCategory]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(onSelectCategory(selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <>
      <AppHeader
        title={item.title.toUpperCase()}
        color={item.color}
        backButton
        shadow={false}
      />
      <BaseView styles={styles.wrapper} loading={initialLoading}>
        <AppCover featured={featured} height={coverHeight} type="demands" />

        <View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{
              paddingVertical: 5,
            }}
            horizontal
            contentContainerStyle={{
              alignItems: 'center',
              paddingLeft: 1,
            }}>
            {categories.map(tag => (
              <StyleTags
                color={item.color}
                key={tag.id}
                selectedTag={selectedCategory}
                item={item}
                tag={tag}
                onPress={() => dispatch(setSelectedCategory(tag.id))}
              />
            ))}
          </ScrollView>
          <ScrollView
            style={{paddingVertical: 5}}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{
              alignItems: 'center',
              paddingLeft: 1,
            }}>
            {subCategories.map((tag, index) => (
              <AppMiniButton
                onPress={() => dispatch(setSelectedSubCategory(tag.id))}
                key={tag.id}
                marginRight={index === subCategories.length - 1 ? 0 : 5}
                title={tag.title}
                otherStyles={{
                  backgroundColor:
                    selectedSubCategory === tag.id
                      ? item.bg_active
                      : item.bg_inactive,
                  borderWidth: 0,
                }}
                textStyles={{
                  color: 'white',
                }}
              />
            ))}
          </ScrollView>
        </View>
        <BaseView styles={{flex: 1}} loading={loading}>
          <AppFlatList
            contentContainerStyle={{paddingBottom: SIZES.tab_bar_height}}
            ListHeaderComponent={() => (
              <View style={{height: headerHeight}}>
                <Text style={styles.headerTextStyle}>
                  {contents?.length ? 'Most Watched' : null}
                </Text>
              </View>
            )}
            data={contents}
            keyExtractor={item => item?.id.toString()}
            renderItem={({item}) => (
              <AppContentList
                content={item}
                height={itemHeight}
                onPressItem={() =>
                  dispatch(onContentViewHandler({item, type: 'demands'}))
                }
              />
            )}
            refreshing={refresh}
            onRefresh={() => {
              dispatch(setRefresh(true));
              dispatch(getDemandDefaultIndex(item?.id));
            }}
            renderEmpty={() => <AppNoDataFound />}
            onEndReachedThreshold={0.1}
            headerHeight={headerHeight}
            itemHeight={itemHeight + 6}
            onEndReached={() =>
              dispatch(
                loadMoreDemandContents({
                  id: selectedSubCategory ? selectedSubCategory : item?.id,
                  type: selectedSubCategory ? 'category' : 'demand',
                }),
              )
            }
            loadMore={loadMore}
          />
        </BaseView>
      </BaseView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  categoryContainerStyle: {
    alignItems: 'center',
    paddingLeft: 1,
  },
  subCategoryContainerStyle: {
    alignItems: 'center',
    paddingLeft: 1,
    height: 40,
  },
  headerTextStyle: {
    ...FONTS.h3,
    color: COLORS.black,
  },
});
