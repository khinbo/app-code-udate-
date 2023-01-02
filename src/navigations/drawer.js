import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Geolocation from '@react-native-community/geolocation';
import {DrawerContent} from './drawerContent';
import {ProfileScreen} from '../screens/root/profile';
import {ChangePasswordScreen} from '../screens/root/changepassword';
import {NotificationScreen} from '../screens/root/notificationsettings';
import {InvoicesScreen} from '../screens/root/invoices';
import {PrivacyScreen} from '../screens/root/privacy';
import {ConfigStack, PlanStack} from './stacknavigation';
import {MainStack} from './rootStack';
import {useDispatch} from 'react-redux';
import {setCoords} from '../store/reducers/home';
import localStorage from '../server/localStorage';
import toast from '../toast';

const Drawer = createDrawerNavigator();
export const DrawerNavigator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.getCoords().then(resp => dispatch(setCoords(resp)));
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const coords = `${latitude},${longitude}`;
        dispatch(setCoords(coords));
        localStorage.saveCoords(coords);
      },
      error => toast.show(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }, []);

  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="main" component={MainStack} />
        <Drawer.Screen name="profile" component={ProfileScreen} />
        <Drawer.Screen name="plans" component={PlanStack} />
        <Drawer.Screen name="password" component={ChangePasswordScreen} />
        <Drawer.Screen name="notification" component={NotificationScreen} />
        <Drawer.Screen name="invoices" component={InvoicesScreen} />
        <Drawer.Screen name="privacy" component={PrivacyScreen} />
        <Drawer.Screen name="settings" component={ConfigStack} />
      </Drawer.Navigator>
    </>
  );
};
