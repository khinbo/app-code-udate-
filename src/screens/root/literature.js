/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppHeader,
  BaseView,
  LiteratureCard,
  LiteratureCover,
  AppFlatList,
  LiteratureTags,
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
import {AppNoDataFound} from '../../components/base/AppNoData';

const itemHeight = 220;

export const LiteratureScreen = ({route, navigation}) => {
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
        color={item.color}
        shadow={false}
        otherStyles={{
          backgroundColor: COLORS.lightGray,
        }}
      />
      <BaseView
        styles={{
          flex: 1,
          backgroundColor: COLORS.lightGray,
          paddingHorizontal: 10,
        }}
        loading={initialLoading}
        loadingBgColor={COLORS.lightGray}>
        {/* Literature Tags  */}
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent:
                categories.length > 3 ? 'flex-start' : 'space-between',
            }}>
            {categories.map((t, index) => (
              <LiteratureTags
                onPress={() => dispatch(setSelectedCategory(t.id))}
                active={selectedCategory === t.id}
                item={item}
                tag={t}
                index={index}
                key={t.id}
                length={categories.length}
              />
            ))}
          </ScrollView>
          {/* Literature Cover  */}
          <View style={{marginVertical: 10}}>
            <LiteratureCover featured={featured} />
          </View>

          {/* Literature sub categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent:
                categories.length > 3 ? 'flex-start' : 'space-between',
            }}>
            {subCategories.map((t, index) => (
              <LiteratureTags
                onPress={() => dispatch(setSelectedSubCategory(t.id))}
                active={selectedSubCategory === t.id}
                item={item}
                tag={t}
                index={index}
                key={t.id}
                width={SIZES.width / 2 - 60}
                length={subCategories.length}
              />
            ))}
          </ScrollView>
        </View>

        {/* Literature card  */}

        <BaseView
          styles={{flex: 1}}
          loading={loading}
          loadingBgColor={COLORS.lightGray}>
          <AppFlatList
            contentContainerStyle={{paddingBottom: 5}}
            data={contents}
            keyExtractor={item => item?.id.toString()}
            renderItem={({item}) => (
              <LiteratureCard
                content={item}
                height={itemHeight}
                onPressItem={() =>
                  navigation.navigate('literatureDetails', {
                    literature: item,
                    color: color,
                  })
                }
                onPressCover={() =>
                  navigation.navigate('literatureDetails', {
                    literature: item,
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
