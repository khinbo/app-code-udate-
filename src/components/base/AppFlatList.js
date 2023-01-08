/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {RefreshControl, View, ActivityIndicator} from 'react-native';
import BigList from 'react-native-big-list';

import {COLORS} from '../../constants/theme';

const footerHeight = 50;

export const AppFlatList = ({
  refreshing,
  loadMore,
  onRefresh,
  isFooter = true,
  ...otherProps
}) => {
  return (
    <BigList
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderFooter={() =>
        isFooter ? (
          <View
            style={{
              height: footerHeight,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
              animating={loadMore}
            />
          </View>
        ) : null
      }
      footerHeight={isFooter ? footerHeight : 0}
      placeholder={true}
      {...otherProps}
    />
  );
};
