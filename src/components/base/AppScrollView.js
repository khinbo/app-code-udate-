/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {FONTS, SIZES} from '../../constants/theme';
import {translate} from '../../I18n';

export const AppScrollView = ({
  children,
  refreshing,
  onRefresh,
  renderItems,
  data = [],
  onListEmpty,
  ...otherProps
}) => {
  if (!renderItems) {
    return null;
  }
  if (!data.length) {
    return (
      <View style={{flex: 1, alignItems: 'center', marginTop: 100}}>
        <Text style={{...FONTS.h4}}>{translate('noRecordFound')}</Text>
      </View>
    );
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: SIZES.tab_bar_height,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      {...otherProps}>
      {data.map(renderItems)}
    </ScrollView>
  );
};
