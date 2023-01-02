/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, {Importance} from 'react-native-push-notification';
import {name as appName} from './app.json';
import localStorage from './src/server/localStorage';
import server from './src/server';

PushNotification.configure({
  onRegister: function (token) {
    localStorage.getPushToken().then(push_token => {
      if (!push_token) {
        localStorage.savePushToken(token.token);
        server
          .updateToken({push_token: token.token})
          .then(resp => console.log(resp.data));
      }
    });
  },

  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'khinbo',
    channelName: 'khinbo app',
    channelDescription: 'khinbo notifications',
    playSound: true,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

AppRegistry.registerComponent(appName, () => App);
