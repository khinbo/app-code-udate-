import React from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS, FONTS} from '../../constants/theme';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {AppNoDataFound} from './AppNoData';
import {Appicon} from './AppIcon';

export const AppPicker = ({
  items = [],
  selected,
  placeholder = 'select item',
  setSelected,
  onSelect = () => {},
  icon,
  title = 'asdd',
  otherStyles,
  item_name = 'label',
  item_value = 'value',
}) => {
  const pickerRef = React.useRef();

  function close() {
    pickerRef.current?.close();
  }

  function open() {
    pickerRef.current?.open();
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={open}
        style={[
          {
            width: '100%',
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            paddingRight: 10,
            borderColor: COLORS.gray,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: 'white',
          },
          otherStyles,
        ]}>
        {title && (
          <View
            style={{
              backgroundColor: COLORS.white,
              position: 'absolute',
              top: -8,
              left: 65,
              zIndex: 99,
              paddingHorizontal: 5,
              paddingVertical: 0,
            }}>
            <Text
              numberOfLines={1}
              style={{
                color: 'rgba(0,0,0,0.6)',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                paddingVertical: 0,
                paddingHorizontal: 0,
                ...FONTS.body4,
                fontSize: 11,
                lineHeight: 14,
              }}>
              {title}
            </Text>
          </View>
        )}
        {icon && (
          <View style={{paddingHorizontal: 20}}>
            <Appicon icon={icon} color={COLORS.black} size={23} />
          </View>
        )}

        <Text
          numberOfLines={1}
          style={{...FONTS.body4, fontSize: 12, flex: 1, color: COLORS.black}}>
          {selected
            ? items.find(i => i?.[item_value] === selected)?.[item_name]
            : placeholder}
        </Text>
      </TouchableOpacity>
      <RBSheet
        ref={pickerRef}
        height={items.length > 4 ? 350 : 250}
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          },
        }}>
        <ScrollView
          style={{
            marginBottom: getBottomSpace(),
            marginTop: 20,
          }}>
          {!items.length && <AppNoDataFound title="No data..." />}
          {items.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setSelected(item?.[item_value]);
                onSelect(item?.[item_value]);
                close();
              }}
              key={`${index} - ${item?.[item_value]}`}
              activeOpacity={0.7}
              style={{
                marginHorizontal: 10,
                marginBottom: 5,
                padding: 15,
                borderBottomColor: COLORS.lightGray,
                borderBottomWidth: 1,
              }}>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.gray,
                  textAlign: 'center',
                }}>
                {item?.[item_name]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RBSheet>
    </>
  );
};
