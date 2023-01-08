/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, Alert} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {useDispatch} from 'react-redux';
import {AppHeader, AppRecordingList, BaseView} from '../../components';
import {AppNoDataFound} from '../../components/base/AppNoData';
import {COLORS, FONTS} from '../../constants/theme';
import {translate} from '../../I18n';
import localStorage from '../../server/localStorage';
import {onContentViewHandler} from '../../store/reducers/player';
import toast from '../../toast';

export const RecordingScreen = ({navigation}) => {
  const dispatch = useDispatch();
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
    localStorage.getDownload().then(resp => {
      const data = JSON.parse(resp) ?? [];
      const filterData = data.filter(item => item.status === 'complete');
      setDownloads(filterData);
    });
  };
  const onPressMedia = item => {
    dispatch(onContentViewHandler({item, type: 'all', status: 'offline'}));
  };

  const onRemoveMedia = item => {
    const fileName = item.path;
    let dirs = RNFetchBlob.fs.dirs;
    const path = dirs.DocumentDir + `/${fileName}`;
    RNFetchBlob.fs.exists(path).then(exist => {
      if (exist) {
        RNFetchBlob.fs
          .unlink(path)
          .then(() => {
            localStorage.getDownload().then(async resp => {
              const data = JSON.parse(resp) ?? [];
              const filterData = data.filter(i => i.id !== item.id);
              const payloadString = JSON.stringify(filterData);
              await localStorage.saveDownload(payloadString);
              setDownloads(filterData);
              toast.show('media deleted');
            });
          })
          .catch(() => toast.show('error while removing media.'));
      }
    });
  };

  return (
    <>
      <AppHeader
        title={translate('recording')}
        otherStyles={{
          backgroundColor: COLORS.black,
        }}
      />
      <BaseView styles={styles.container}>
        <FlatList
          style={{
            flexGrow: 1,
          }}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={downloads}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <AppRecordingList
              movie={item}
              onPress={onPressMedia}
              onLongPress={() =>
                Alert.alert(
                  'Delete Media?',
                  'Are you sure tou want to delete media from recordings.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {},
                    },
                    {
                      text: 'Delete',
                      onPress: () => onRemoveMedia(item),
                      style: 'destructive',
                    },
                  ],
                )
              }
            />
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
