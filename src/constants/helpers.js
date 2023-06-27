import {Alert} from 'react-native';
import {StorageURL, URL} from '../server/urls';
import toast from '../toast';

export const UNSUBSCRIBE = 'unsubscribe';
export const FREE = 'free';
export const SUBSCRIBE = 'subscribe';

const getGender = val =>
  val == 1
    ? 'Male'
    : val === 2
    ? 'Female'
    : val == 4
    ? 'optional'
    : 'Non-binary';

const getImage = img =>
  img
    ? img?.includes('http')
      ? img
      : img?.includes('base64')
      ? img
      : img?.includes('/users/dps/default.png')
      ? URL + img
      : StorageURL + img
    : null;

const getVideo = path =>
  path
    ? path?.includes('http')
      ? path
      : path?.includes('base64')
      ? path
      : path?.includes('/users/dps/default.png')
      ? URL + path
      : StorageURL + '/' + path
    : null;

const checkSubsciption = item => {
  if (item === null) return UNSUBSCRIBE;
  if (item?.subscribe?.is_free) return FREE;
  else return SUBSCRIBE;
};

const apiResponseErrorHandler = resp => {
  if (resp.data && resp.data?.title && resp.data?.message) {
    Alert.alert(resp.data.title, resp.data.message);
  } else {
    if (resp.data && resp.data?.errors) {
      let fieldName = Object.keys(resp.data.errors)[0];
      let errorMessage = resp.data.errors[fieldName][0];
      return toast.show(`${fieldName} ${errorMessage}`);
    }
    const message = resp?.data?.message || 'NETWORK_ERR';
    toast.show(message);
  }
};

const isValid = user => {
  if (
    checkSubsciption(user?.is_subscribed) === SUBSCRIBE &&
    checkSubsciption(user?.is_subscribed) !== FREE
  ) {
    return true;
  }

  if (checkSubsciption(user?.is_subscribed) === UNSUBSCRIBE) {
    return false;
  }
  return false;
};

const apiMessageHandler = resp => {
  if (resp?.data?.message) {
    toast.show(resp.data.message);
  }
};

export default {
  getGender,
  getImage,
  getVideo,
  checkSubsciption,
  apiResponseErrorHandler,
  apiMessageHandler,
  isValid,
};
