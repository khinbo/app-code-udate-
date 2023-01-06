/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {
  AppCover,
  AppFlatList,
  AppHeader,
  AppMiniButton,
  AppTags,
  ArtCard,
  BaseView,
} from '../../components';
import {
  getDemandDefaultIndex,
  loadMoreDemandContents,
  onSelectCategory,
  OnSelecteSubCategory,
  setRefresh,
  setSelectedCategory,
  setSelectedSubCategory,
} from '../../store/reducers/demand';
import {COLORS, SIZES} from '../../constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {AppNoDataFound} from '../../components/base/AppNoData';

const itemHeight = 200;
const coverHeight = SIZES.width / 2;
export const ArtScreen = ({route, navigation}) => {
  const {item} = route.params;

  const color = item.color;

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
        backButton
        shadow={false}
        color={item.color}
      />
      <BaseView
        styles={{
          flex: 1,
          backgroundColor: COLORS.white,
          paddingHorizontal: 10,
        }}
        loading={initialLoading}>
        <AppCover height={coverHeight} featured={featured} type="demands" />
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
            {categories.map((tag, index) => (
              <AppTags
                length={categories.length}
                color={item.color}
                index={index}
                active={selectedCategory === tag.id}
                image={tag.img}
                marginRight={index === categories.length - 1 ? 0 : 10}
                key={tag.id}
                selectedTag={selectedCategory}
                item={item}
                otherStyles={{
                  backgroundColor: item.color,
                  borderWidth: 0,
                }}
                textStyles={{
                  color:
                    selectedCategory === tag.id
                      ? item.active_color
                      : item.inactive_color,
                }}
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
                length={subCategories.length}
                active={selectedSubCategory === tag.id}
                image={tag.img}
                onPress={() => dispatch(setSelectedSubCategory(tag.id))}
                key={tag.id}
                marginRight={index === subCategories.length - 1 ? 0 : 5}
                title={tag.title}
                otherStyles={{
                  backgroundColor:
                    selectedSubCategory === tag
                      ? item.bg_active
                      : item.bg_inactive,
                  borderWidth: 0,
                }}
                textStyles={{
                  color:
                    selectedSubCategory === tag
                      ? item.active_color
                      : item.inactive_color,
                }}
              />
            ))}
          </ScrollView>
        </View>
        <BaseView styles={{flex: 1}} loading={loading}>
          <AppFlatList
            contentContainerStyle={{paddingBottom: 5}}
            data={contents}
            keyExtractor={item => item?.id.toString()}
            renderItem={({item}) => (
              <ArtCard
                content={item}
                height={itemHeight}
                onPressItem={() =>
                  navigation.navigate('artDetails', {
                    art: item,
                    color: color,
                  })
                }
                onPressCover={() =>
                  navigation.navigate('artDetails', {
                    art: item,
                    color: color,
                  })
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
            itemHeight={itemHeight + 1}
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
