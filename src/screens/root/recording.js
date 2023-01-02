/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppHeader, AppRecordingList, BaseView} from '../../components';
import {AppNoDataFound} from '../../components/base/AppNoData';
import {COLORS, FONTS} from '../../constants/theme';
import {translate} from '../../I18n';
import localStorage from '../../server/localStorage';
import {onContentViewHandler} from '../../store/reducers/player';

export const RecordingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    localStorage.getDownload().then(resp => {
      const data = JSON.parse(resp) ?? [];
      const filterData = data.filter(item => item.status === 'complete');
      setDownloads(filterData);
    });
    setLoading(false);
  };
  const onPressMedia = item => {
    dispatch(onContentViewHandler({item, type: 'all', status: 'offline'}));
  };

  return (
    <>
      <AppHeader
        title={translate('recording')}
        otherStyles={{
          backgroundColor: COLORS.black,
        }}
      />
      <BaseView styles={styles.container} loading={loading}>
        <FlatList
          style={{
            flexGrow: 1,
          }}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={downloads}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <AppRecordingList movie={item} onPress={onPressMedia} />
          )}
          ListEmptyComponent={() => (
            <AppNoDataFound title="No record found..." />
          )}
        />
      </BaseView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  movieContainer: {
    marginVertical: 5,
  },
  title: {
    ...FONTS.h2,
    fontSize: 18,
    marginBottom: 5,
    color: COLORS.white,
  },
});
