/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  AppHeader,
  AppTitleToggle,
  ArtCard,
  ArtContacts,
  ArtExhibition,
  BaseView,
} from '../../components';
import icons from '../../constants/icons';
import {COLORS} from '../../constants/theme';
import {onContentViewHandler} from '../../store/reducers/player';

export const ArtDetailsScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {color, art} = route.params;
  const [showExhibition, setShowExhibition] = useState(true);
  const [showContacts, setShowContacts] = useState(true);

  return (
    <>
      <AppHeader title={art?.artist} backButton shadow={false} color={color} />
      <BaseView
        styles={{
          flex: 1,
          backgroundColor: COLORS.white,
          paddingHorizontal: 10,
        }}
        loading={false}>
        <ScrollView>
          {/* ART CARD  */}

          <ArtCard
            content={art}
            height={200}
            readMode={true}
            onPressItem={() => {}}
            onPressCover={() =>
              art?.video_url
                ? dispatch(
                    onContentViewHandler({
                      item: art,
                      type: 'demands',
                    }),
                  )
                : null
            }
          />

          {/* EXHIBITION  */}
          <View style={{marginTop: 10}}>
            <AppTitleToggle
              color={color}
              title="Exhibition"
              onPress={() => setShowExhibition(!showExhibition)}
              showDetails={showExhibition}>
              <ArtExhibition items={art?.extras} />
            </AppTitleToggle>
          </View>
          {/* LINKS AND CONTACTS */}
          <View style={{marginVertical: 10}}>
            <AppTitleToggle
              color={color}
              title="Links and Contacts"
              onPress={() => setShowContacts(!showContacts)}
              showDetails={showContacts}
              icon={icons.target}>
              <ArtContacts color={color} item={art} />
            </AppTitleToggle>
          </View>
        </ScrollView>
      </BaseView>
    </>
  );
};
