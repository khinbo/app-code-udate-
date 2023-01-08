/* eslint-disable react-native/no-inline-styles */
import 'react-native-reanimated';
import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {View, StatusBar, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Toast from 'react-native-easy-toast';
import {AuthStack, DrawerNavigator} from './src/navigations';
import AuthContext from './src/store/AuthContext';
import {navigationRef} from './src/navigations/rootNavigation';
import {store} from './src/store';
import toast, {toastRef} from './src/toast';
import server from './src/server';
import localStorage from './src/server/localStorage';
import {changeLanguage} from './src/I18n';
import {StripeProvider} from '@stripe/stripe-react-native';

const App = () => {
  const [user, setUser] = useState(null);
  const [isSplashEnd, setIsSplashEnd] = useState(false);
  const [firstVisit, setFirstVisit] = useState(null);
  const [publishableKey, setPublishableKey] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = useCallback(async () => {
    setLoading(true);
    const firstVisitValue = await localStorage.getIsFirstTime();
    setFirstVisit(firstVisitValue);
    const lang = await localStorage.getLang();
    await changeLanguage(lang ? lang : 'fr');
    server.getStripeKey().then(resp => {
      if (!resp.ok)
        toast.show(JSON.stringify(resp.data?.message ?? 'Network error'));
      else setPublishableKey(resp.data);
    });
    server.me().then(resp => {
      setLoading(false);
      if (!resp.ok) toast.show(resp.data?.message);
      else setUser(resp.data);
    });
    setTimeout(() => {
      setIsSplashEnd(true);
    }, 500);
  }, []);

  const trigger = useMemo(() => {
    return {
      signin: user => {
        setUser(user);
      },
      signout: () => {
        localStorage.removeToken().then(() => {
          setUser(null);
        });
      },
    };
  });

  if (loading || !isSplashEnd) {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <Image
          source={require('./assets/splash.png')}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        <StatusBar hidden={true} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{trigger, user, firstVisit}}>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <>
            <Toast ref={toastRef} />
            {user ? (
              <StripeProvider publishableKey={publishableKey}>
                <DrawerNavigator />
              </StripeProvider>
            ) : (
              <AuthStack />
            )}
            <StatusBar hidden={true} />
          </>
        </NavigationContainer>
      </Provider>
    </AuthContext.Provider>
  );
};

export default App;
