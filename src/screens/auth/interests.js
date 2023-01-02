/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import {Appicon, BaseView} from '../../components';
import icons from '../../constants/icons';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import server from '../../server';
import helpers from '../../constants/helpers';
import useAuth from '../../hooks/useAuth';

const numColumns = 3;
export const InterestsScreen = () => {
  const {completeInterestStatus, loading} = useAuth();
  const [initialLoading, setInitialLoading] = useState(false);
  const [appData, setAppData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setInitialLoading(true);
    server.getAppData().then(resp => {
      setInitialLoading(false);
      if (!resp.ok) return;
      setAppData(resp.data);
    });
  }, []);

  const onPressCategory = item => {
    if (selectedCategories.find(i => i === item.id)) {
      const filters = selectedCategories.filter(i => i !== item.id);
      setSelectedCategories(filters);
    } else {
      setSelectedCategories([...selectedCategories, item.id]);
    }
  };
  return (
    <BaseView
      styles={{flex: 1, paddingHorizontal: 20}}
      loading={initialLoading}
      overlayLoading={loading}>
      <View style={{flex: 1, marginTop: 20}}>
        <Text style={styles.title}>
          Choisissez au moins deux (2) catégories
        </Text>
        <View style={styles.container}>
          <MasonryList
            data={appData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignSelf: 'stretch',
              paddingBottom: SIZES.tab_bar_height,
              marginTop: 20,
            }}
            numColumns={numColumns}
            keyExtractor={item => item?.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => onPressCategory(item)}
                activeOpacity={0.9}
                style={{alignItems: 'center', marginBottom: 10}}>
                {item.img ? (
                  <View
                    style={{
                      height: SIZES.width / 4,
                      width: SIZES.width / 4,
                      borderRadius: 200,
                      borderWidth: 3,
                      borderColor: selectedCategories.find(i => i === item.id)
                        ? COLORS.primary
                        : COLORS.gray,

                      overflow: 'hidden',
                    }}>
                    <Image
                      source={{uri: helpers.getImage(item.img)}}
                      style={{
                        height: SIZES.width / 4,
                        width: SIZES.width / 4,
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      height: SIZES.width / 4,
                      width: SIZES.width / 4,
                      borderRadius: 200,
                      borderWidth: 3,
                      borderColor: selectedCategories.find(i => i === item.id)
                        ? COLORS.primary
                        : COLORS.gray,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Appicon
                      icon={item.icon ?? icons.record}
                      size={50}
                      color={COLORS.black}
                    />
                  </View>
                )}
                <Text
                  style={{...FONTS.body4, fontSize: 10, marginTop: 2}}
                  numberOfLines={1}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
            refreshing={false}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => completeInterestStatus(selectedCategories)}
          disabled={selectedCategories.length < 2}
          activeOpacity={0.7}
          style={[
            styles.button,
            {
              backgroundColor:
                selectedCategories.length < 2
                  ? COLORS.lightGray
                  : COLORS.primary,
            },
          ]}>
          <Text
            style={{
              ...FONTS.h4,
              color:
                selectedCategories.length < 2 ? COLORS.black : COLORS.white,
            }}>
            Poursuivre
          </Text>
        </TouchableOpacity>
      </View>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  title: {
    ...FONTS.body3,
    backgroundColor: COLORS.primary,
    padding: 10,
    color: COLORS.white,
  },
  container: {
    flex: 1,
    marginTop: 10,
  },
  buttonContainer: {
    width: 100,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 20 : 50,
    right: 10,
    marginTop: 10,
    zIndex: 50,
  },
  button: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 3,
  },
});
