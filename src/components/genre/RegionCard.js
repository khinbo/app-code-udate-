import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import {AppTitle} from '../base/AppTitle';
import {GenreCard} from './GenreCard';

const numColumns = 2;

export const RegionCard = ({region, onPressGenre}) => {
  const [isNotAlign, setIsNotAlign] = useState(null);
  const [unBalanceItem, setUnBalanceItem] = useState(null);
  const [lastRaw, setLastRaw] = useState(0);

  useEffect(() => {
    getLastRowRecord(region.genres);
  }, [region.genres]);

  const getLastRowRecord = useCallback(dataList => {
    if (dataList.length === 3) {
      const left = dataList.filter(
        (item, index) => index % 2 == 0 && item.is_featured,
      );
      const right = dataList.filter((_, index) => index % 2 !== 0);
      const nmbr = left.length ? 2 : 0;
      setIsNotAlign(true);
      setUnBalanceItem(right[0]);
      return setLastRaw(nmbr);
    }
    const totalRows = Math.floor(dataList.length / numColumns);
    const totalLastRows = dataList.length - totalRows * numColumns;
    const left = dataList.filter(
      (item, index) => index % 2 == 0 && item.is_featured,
    );
    const right = dataList.filter(
      (item, index) => index % 2 != 0 && item.is_featured,
    );

    if (left.length !== right.length) {
      setIsNotAlign(true);
      setLastRaw(totalLastRows);
      if (left.length > right.length) {
        setLastRaw(left.length - right.length);
        setUnBalanceItem(dataList[dataList.length - 1]);
      } else {
        setLastRaw(right.length - left.length);
        const leftSide = dataList.filter((_, index) => index % 2 == 0);
        setUnBalanceItem(leftSide[leftSide.length - 1]);
      }
    } else setIsNotAlign(false);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 15,
      }}>
      <AppTitle title={region?.name} />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        <MasonryList
          data={region.genres}
          contentContainerStyle={{
            alignSelf: 'stretch',
          }}
          numColumns={numColumns}
          keyExtractor={item => item?.id.toString()}
          renderItem={({item}) => (
            <GenreCard
              genre={item}
              onPress={onPressGenre}
              isNotAlign={isNotAlign && unBalanceItem?.id === item?.id}
              lastRaw={lastRaw}
            />
          )}
        />
      </View>
    </View>
  );
};
