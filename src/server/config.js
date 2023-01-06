import {create} from 'apisauce';
import {baseURL} from './urls';
import localStorage from './localStorage';

const apiClient = create({baseURL});

apiClient.addAsyncRequestTransform(async request => {
  const token = await localStorage.getToken();
  console.log(token);
  if (!token) return;
  request.headers.Authorization = `Bearer ${token}`;
});

export default apiClient;
