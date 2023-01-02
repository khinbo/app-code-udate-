import React, { useEffect } from 'react';
import {View, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  AppHeader,
  AppTitleToggle,
  LiteratureCard,
  LiteratureLocation,
} from '../../components';
import icons from '../../constants/icons';
import {COLORS} from '../../constants/theme';
import {onContentViewHandler} from '../../store/reducers/player';

export const LiteratureDetailsScreen = ({route}) => {
  const dispatch = useDispatch();
  const {literature, color} = route.params;
  const [showLocation, setShowLocation] = React.useState(true);

  return (
    <>
      <AppHeader
        title={literature?.artist}
        backButton
        color={color}
        shadow={false}
        otherStyles={{
          backgroundColor: COLORS.lightGray,
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.lightGray,
          paddingHorizontal: 15,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Literature card  */}
          <View style={{marginVertical: 10}}>
            <LiteratureCard
              content={literature}
              readMode={true}
              height={220}
              onPressItem={() => {}}
              onPressCover={() =>
                literature.video_url
                  ? dispatch(
                      onContentViewHandler({
                        item: literature,
                        type: 'demands',
                      }),
                    )
                  : null
              }
            />
          </View>

          <View
            style={{
              marginVertical: 5,
            }}>
            <AppTitleToggle
              color={color}
              title="Location"
              icon={icons.target}
              onPress={() => setShowLocation(!showLocation)}
              showDetails={showLocation}>
              <LiteratureLocation color={color} items={literature?.extras} />
            </AppTitleToggle>
          </View>

          <View
            style={{height: 1, backgroundColor: COLORS.gray, width: '100%'}}
          />

          {/* Literature location */}
        </ScrollView>
      </View>
    </>
  );
};
