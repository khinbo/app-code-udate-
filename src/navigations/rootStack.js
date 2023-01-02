import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ArtDetailsScreen,
  ArtScreen,
  CinemaDetailsScreen,
  CinemaScreen,
  ContentDetails,
  LiteratureDetailsScreen,
  LiteratureScreen,
  SportsScreen,
  StyleScreen,
} from '../screens';
import {OndemandDetailsScreen} from '../screens/root/ondemonddetails';
import {BottomTab} from './bottomTab';

const Stack = createStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="rootTab">
      <Stack.Screen name="rootTab" component={BottomTab} />
      <Stack.Screen name="genreContentDetails" component={ContentDetails} />
      <Stack.Screen name="demondDetails" component={OndemandDetailsScreen} />
      <Stack.Screen name="sportsScreen" component={SportsScreen} />
      <Stack.Screen name="cinemaScreen" component={CinemaScreen} />
      <Stack.Screen name="cinemaDetails" component={CinemaDetailsScreen} />
      <Stack.Screen name="literatureScreen" component={LiteratureScreen} />
      <Stack.Screen
        name="literatureDetails"
        component={LiteratureDetailsScreen}
      />
      <Stack.Screen name="artScreen" component={ArtScreen} />
      <Stack.Screen name="artDetails" component={ArtDetailsScreen} />
      <Stack.Screen name="styleScreen" component={StyleScreen} />
    </Stack.Navigator>
  );
};
