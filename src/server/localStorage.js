import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = token => AsyncStorage.setItem('token', token);
const getToken = () => AsyncStorage.getItem('token');
const removeToken = () => AsyncStorage.removeItem('token');
const savePushToken = token => AsyncStorage.setItem('push_token', token);
const getPushToken = () => AsyncStorage.getItem('push_token');
const removePushToken = () => AsyncStorage.removeItem('push_token');

const saveIsFirstTime = () => AsyncStorage.setItem('isFirstTime', 'yes');
const getIsFirstTime = () => AsyncStorage.getItem('isFirstTime');
const saveLang = lang => AsyncStorage.setItem('language', lang);
const getLang = () => AsyncStorage.getItem('language');
const saveCoords = coords => AsyncStorage.setItem('coords', coords);
const getCoords = () => AsyncStorage.getItem('coords');

const saveDownload = payload => AsyncStorage.setItem('download', payload);
const getDownload = () => AsyncStorage.getItem('download');
const removeDownload = () => AsyncStorage.removeItem('download');

export default {
  saveToken,
  getToken,
  removeToken,
  savePushToken,
  getPushToken,
  removePushToken,
  saveIsFirstTime,
  getIsFirstTime,
  saveLang,
  getLang,
  saveCoords,
  getCoords,
  saveDownload,
  getDownload,
  removeDownload,
};
