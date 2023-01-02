import {StorageURL, URL} from '../server/urls';

export const UNSUBSCRIBE = 'unsubscribe';
export const FREE = 'free';
export const SUBSCRIBE = 'subscribe';

const getGender = val =>
  val == 1 ? 'Male' : val === 2 ? 'Female' : 'Non-binary';

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

export default {
  getGender,
  getImage,
  getVideo,
  checkSubsciption,
};
