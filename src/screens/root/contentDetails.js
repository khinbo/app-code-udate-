/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppFlatList,
  AppPlayer,
  BaseView,
  ItemList,
  VideoDetails,
} from '../../components';
import {AppNoDataFound} from '../../components/base/AppNoData';
import helpers from '../../constants/helpers';
import {COLORS, SIZES} from '../../constants/theme';
import useDownload from '../../hooks/useDownload';
import videoRef from '../../refs/video';
import {
  getRecommmendedContents,
  onPlayVideo,
} from '../../store/reducers/player';

const itemHeight = 80;

export const ContentDetails = ({route, navigation}) => {
  const {type} = route.params;
  const dispatch = useDispatch();

  const {content_details, filePath, contents, loading} = useSelector(
    state => state.player,
  );

  const {addToTask, progress, isDownloaded, isPathExist} = useDownload();

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', async () => {
      await videoRef.stopAsync();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    isPathExist(content_details?.path);
  }, [content_details, filePath]);

  useEffect(() => {
    const unsubscribe = dispatch(
      getRecommmendedContents({type: type, id: content_details?.id}),
    );
    return unsubscribe;
  }, []);

  return (
    <>
      <View style={{backgroundColor: COLORS.black}}>
        <AppPlayer
          url={
            content_details?.status === 'complete'
              ? Platform.OS === 'ios'
                ? '' + content_details?.downloadPath
                : 'file://' + content_details?.downloadPath
              : helpers.getVideo(content_details?.video_url)
          }
          artist={content_details?.artist}
          poster={content_details?.cover}
          video_limit={content_details?.video_limit}
          limit_duration={content_details?.limit_duration}
          id={content_details?.id}
          title="home"
          type={type}
          landscape={'landscape'}
        />
        <VideoDetails
          onDownload={item => addToTask(item)}
          isPathExist={isPathExist}
          progress={progress}
          filePath={filePath}
          isDownloaded={isDownloaded}
        />
      </View>

      <BaseView styles={styles.container} loading={loading}>
        <AppFlatList
          contentContainerStyle={{
            paddingBottom: SIZES.tab_bar_height,
            paddingHorizontal: 10,
          }}
          data={contents}
          keyExtractor={item => item?.id.toString()}
          renderItem={({item}) => (
            <ItemList
              item={item}
              height={itemHeight}
              onPressItem={item => dispatch(onPlayVideo(item))}
              active={content_details.id === item.id}
            />
          )}
          refreshing={loading}
          onRefresh={() =>
            dispatch(
              getRecommmendedContents({type: type, id: content_details?.id}),
            )
          }
          renderEmpty={() => <AppNoDataFound />}
          itemHeight={itemHeight + 1}
          isFooter={false}
        />
      </BaseView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
