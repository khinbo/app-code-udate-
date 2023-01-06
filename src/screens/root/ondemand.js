/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MasonryList from '@react-native-seoul/masonry-list';
import {AppHeader, DemandList, BaseView} from '../../components';
import {COLORS, SIZES} from '../../constants/theme';
import navigation from '../../navigations/rootNavigation';
import {translate} from '../../I18n';
import {getDemands, resetData, setRefresh} from '../../store/reducers/demand';
import useGridCalculator from '../../hooks/useGridCalculator';

const numColumns = 2;

export const OndemandScreen = () => {
  const dispatch = useDispatch();
  const {initialLoading, refresh, demands} = useSelector(state => state.demand);
  const {isNotAlign, unBalanceItem, lastRaw} = useGridCalculator(
    demands,
    numColumns,
  );

  useEffect(() => {
    const fetch = dispatch(getDemands());
    return () => {
      fetch;
    };
  }, []);

  const onPressDemond = item => {
    console.log(item);
    // alert(JSON.stringify(item))
    dispatch(resetData());
    switch (item.type) {
      case 'style':
        navigation.navigate('styleScreen', {
          item: item,
        });
        return;
      case 'sports':
        navigation.navigate('sportsScreen', {
          item: item,
        });
        return;

      case 'cinema':
        navigation.navigate('cinemaScreen', {
          item: item,
        });
        return;

      case 'literature':
        navigation.navigate('literatureScreen', {
          item: item,
        });
        return;

      case 'art':
        navigation.navigate('artScreen', {
          item: item,
        });
        return;

      default:
        navigation.navigate('demondDetails', {
          item: item,
        });
        return;
    }
  };

  return (
    <>
      <AppHeader
        title={translate('onDemand')}
        shadow={false}
        otherStyles={{
          backgroundColor: COLORS.lightGray,
        }}
      />

      <BaseView styles={styles.baseView} loading={initialLoading}>
        <View style={styles.container}>
          <MasonryList
            data={demands}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignSelf: 'stretch',
              paddingBottom: SIZES.tab_bar_height,
            }}
            numColumns={numColumns}
            keyExtractor={item => item?.id.toString()}
            renderItem={({item}) => (
              <DemandList
                item={item}
                onPressDemond={() => onPressDemond(item)}
                isNotAlign={isNotAlign && unBalanceItem?.id === item?.id}
                lastRaw={lastRaw}
                total={demands?.length}
              />
            )}
            refreshing={refresh}
            onRefresh={() => {
              dispatch(setRefresh(true));
              dispatch(getDemands());
            }}
          />
        </View>
      </BaseView>
    </>
  );
};

const styles = StyleSheet.create({
  baseView: {
    paddingHorizontal: 20,
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
