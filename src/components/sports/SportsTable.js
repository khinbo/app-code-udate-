/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import helpers from '../../constants/helpers';
import {FONTS} from '../../constants/theme';

const TableRow = ({icon, title, c1, c2, c3, c4, c5}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View
        style={{
          width: '50%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
        }}>
        {icon && (
          <Image
            source={{uri: helpers.getImage(icon)}}
            style={{height: 15, width: 15, borderRadius: 2, marginRight: 5}}
          />
        )}
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.body4,
            flex: 1,
            fontSize: 10,
            marginRight: 5,
          }}>
          {title}
        </Text>
      </View>
      <View
        style={{
          width: '50%',
          flexDirection: 'row',
          paddingVertical: 10,
          borderBottomWidth: 1,
        }}>
        <Text style={styles.headerTitle}>{c1}</Text>
        <Text style={styles.headerTitle}>{c2}</Text>
        <Text style={styles.headerTitle}>{c3}</Text>
        <Text style={styles.headerTitle}>{c4}</Text>
        <Text style={styles.headerTitle}>{c5}</Text>
      </View>
    </View>
  );
};

export const SportsTable = ({data}) => {
  return (
    <View
      style={{
        marginTop: 15,
        paddingHorizontal: 5,
      }}>
      <TableRow title="Team" c1="D" c2="L" c3="Ga" c4="Gd" c5="Pts" />
      {data?.map(item => (
        <TableRow
          key={item.id}
          icon={item?.img}
          title={item?.team}
          c1={item?.d}
          c2={item?.l}
          c3={item?.ga}
          c4={item?.gd}
          c5={item?.pts}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    ...FONTS.body4,
    fontSize: 10,
    width: '20%',
    textAlign: 'center',
  },
});
