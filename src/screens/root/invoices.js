import React from 'react';
import {View, Text} from 'react-native';
import {AppHeader} from '../../components';
import {COLORS} from '../../constants/theme';

export const InvoicesScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <AppHeader title={'Invoices'} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Invoices screen</Text>
      </View>
    </View>
  );
};
