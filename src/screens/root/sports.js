/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import {AnimatePresence, MotiView} from 'moti';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppPlayer,
  BaseView,
  SportsHeader,
  SportsNewsCard,
  SportsTable,
  SportsTableButton,
  SportsTablePronostics,
  SportsTableScore,
  SportsTags,
} from '../../components';
import {COLORS, FONTS} from '../../constants/theme';
import {
  getDemandDefaultIndex,
  loadMoreDemandContents,
  onSelectCategory,
  OnSelecteSubCategory,
  setRefresh,
  setSelectedCategory,
  setSelectedSubCategory,
} from '../../store/reducers/demand';
import videoRef from '../../refs/video';
import helpers from '../../constants/helpers';
// import { onContentViewHandler } from "../../store/reducers/player";

const tableHeadersContent = [
  {id: 1, title: 'Score'},
  {id: 2, title: 'Table'},
  {id: 3, title: 'Pronostics'},
];

export const SportsScreen = ({route, navigation}) => {
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
  } = useSelector(state => state.demand);
  const [activeTableRow, setActiveTableRow] = useState('Score');

  const {item} = route.params;

  useEffect(() => {
    alert(JSON.stringify(props));
  }, []);

  const renderTitle = title => {
    return (
      <View
        style={[
          styles.contentHeader,
          {
            backgroundColor: item.active_color,
          },
        ]}>
        <Text
          style={[
            styles.contentTitle,
            {
              color: item.inactive_color,
            },
          ]}>
          {title}
        </Text>
      </View>
    );
  };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     dispatch(getDemandDefaultIndex(item?.id));
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', async () => {
      await videoRef.unloadAsync();
    });
    return unsubscribe;
  }, [navigation]);

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
    if (subCategories.length) {
      dispatch(setSelectedSubCategory(subCategories[0]?.id));
    }
  }, [subCategories]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(onSelectCategory(selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <>
      <SportsHeader color={item.color} />
      <BaseView styles={{flex: 1}} loading={initialLoading}>
        <View
          style={{
            backgroundColor: COLORS.lightGray,
            paddingHorizontal: 15,
          }}>
          {/* Categories  */}

          <ScrollView
            contentContainerStyle={{
              justifyContent: 'space-between',
              paddingVertical: 5,
              paddingLeft: 2,
            }}
            horizontal>
            {categories.map((cat, index) => (
              <SportsTags
                color={item.color}
                item={cat}
                key={cat.id}
                marginRight={index === categories.length - 1 ? 1 : 5}
                orgColor
                active={selectedCategory === cat.id}
                onPress={() => dispatch(setSelectedCategory(cat.id))}
              />
            ))}
          </ScrollView>

          {/* End Categories  */}

          {/* SubCategories  */}

          <View style={{marginTop: 0}}>
            {renderTitle('Championship')}
            <ScrollView
              contentContainerStyle={{
                justifyContent: 'space-between',
                paddingVertical: 5,
                paddingLeft: 2,
              }}
              horizontal>
              {subCategories.map((cat, index) => (
                <SportsTags
                  color={item.color}
                  item={cat}
                  background={cat.img}
                  key={cat.id}
                  marginRight={index === subCategories.length - 1 ? 1 : 5}
                  orgColor
                  type="sub"
                  onPress={() => dispatch(setSelectedSubCategory(cat.id))}
                  active={selectedSubCategory === cat.id}
                />
              ))}
            </ScrollView>
          </View>
          {/* End SubCategories  */}
        </View>

        {/* Scrollable  */}

        {selectedSubCategory ? (
          <BaseView
            loading={loading}
            styles={{
              flex: 1,
              backgroundColor: COLORS.lightGray,
            }}>
            {/* Highlights  */}
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}>
              <View style={{marginTop: 0}}>
                {renderTitle('Highlights')}

                {contents.map(content => (
                  <View key={content?.id} style={{marginVertical: 2}}>
                    <AppPlayer
                      url={helpers.getVideo(content?.video_url)}
                      artist={content?.artist}
                      poster={content?.cover}
                      video_limit={content?.video_limit}
                      limit_duration={content?.limit_duration}
                      shouldPlay={false}
                      id={content?.id}
                      type={'demands'}
                      isBack={false}
                      isFullScreen={false}
                    />
                  </View>
                ))}
              </View>

              <View style={{marginTop: 10}}>
                {renderTitle('Latest Matches')}
                <View style={styles.table}>
                  <View style={styles.tableHeader}>
                    {tableHeadersContent.map(t => (
                      <SportsTableButton
                        key={t.id}
                        onPress={() => setActiveTableRow(t.title)}
                        title={t.title}
                        color={item.color}
                        active={activeTableRow === t.title}
                      />
                    ))}
                  </View>
                  <ScrollView style={styles.tableBody}>
                    <AnimatePresence exitBeforeEnter>
                      {activeTableRow == 'Score' ? (
                        <MotiView
                          key="score"
                          animate={{opacity: 1}}
                          exit={{
                            opacity: 0,
                          }}>
                          {subCategories
                            .find(i => i.id === selectedSubCategory)
                            ?.scores.map(score => (
                              <SportsTableScore
                                color={item.color}
                                key={score.id}
                                score={score}
                              />
                            ))}
                        </MotiView>
                      ) : activeTableRow === 'Table' ? (
                        <MotiView
                          key="table"
                          animate={{opacity: 1}}
                          exit={{
                            opacity: 0,
                          }}>
                          <SportsTable
                            data={
                              subCategories.find(
                                i => i.id === selectedSubCategory,
                              )?.standings
                            }
                          />
                        </MotiView>
                      ) : activeTableRow === 'Pronostics' ? (
                        <MotiView
                          key="pronostics"
                          animate={{opacity: 1}}
                          exit={{
                            opacity: 0,
                          }}>
                          <ScrollView
                            contentContainerStyle={{
                              paddingVertical: 10,
                              paddingLeft: 2,
                              marginTop: 10,
                            }}
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            {subCategories
                              .find(i => i.id === selectedSubCategory)
                              ?.pronostics.map(item => (
                                <SportsTablePronostics
                                  color={item.color}
                                  item={item}
                                  key={item.id}
                                />
                              ))}
                          </ScrollView>
                        </MotiView>
                      ) : null}
                    </AnimatePresence>
                  </ScrollView>
                </View>
              </View>
              <View style={{marginTop: 10}}>
                {renderTitle(
                  `${
                    subCategories.find(i => i.id === selectedSubCategory)
                      ?.title ?? ''
                  } Latest News`,
                )}
                <ScrollView
                  contentContainerStyle={{
                    paddingVertical: 10,
                    paddingLeft: 2,
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  {subCategories
                    .find(i => i.id === selectedSubCategory)
                    ?.news.map(item => (
                      <SportsNewsCard key={item?.id} item={item} />
                    ))}
                </ScrollView>
                <View style={{height: 30}} />
              </View>
            </ScrollView>
          </BaseView>
        ) : null}
      </BaseView>

      {/* End  Scrollable  */}
    </>
  );
};

const styles = StyleSheet.create({
  contentHeader: {
    height: 30,
    justifyContent: 'center',
    borderRadius: 2,
    marginVertical: 10,
  },
  contentTitle: {
    marginLeft: 5,
    ...FONTS.h3,
  },
  tableBody: {},
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
