/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import appsFlyer from 'react-native-appsflyer';

appsFlyer.initSdk(
  {
    devKey: 'Ngs6YqhosNTRjYs3bSgkj4',
    isDebug: false,
    appId: '6445998171',
  },
  result => {
    console.log(result, '-->appsFlyer-result');
  },
  error => {
    console.error(error, '-->appsFlyer-error');
  },
);

AppRegistry.registerComponent(appName, () => App);
