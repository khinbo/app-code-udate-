import {create} from 'apisauce';
import moment from 'moment';

const baseURL = 'https://api-gate2.movieglu.com/';

const moviesClient = create({
  baseURL,
  headers: {
    'api-version': 'v200',
    Authorization: 'Basic V1hZSF9YWDpzZEFNOE94VFhkV0c=',
    client: 'WXYH_XX',
    'x-api-key': 'TbRx1chL1R8rUnzH3gUH984cIgTT3lSdz2lOyAK3',
    'device-datetime': moment(Date.now()).toDate(),
    territory: 'XX',
    language: 'en',
  },
});

export default moviesClient;
