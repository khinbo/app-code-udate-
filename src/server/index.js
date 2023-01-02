import client from './config';

const signup = payload => client.post('/signup', payload);

const signin = payload => client.post('/login', payload);

const sendOtp = payload => client.post('/send_otp', payload);

const sendEmailOtp = payload => client.post('/send_email_otp', payload);

const resetPassword = payload => client.post('/reset_password', payload);

const completeProfile = payload => client.post('/complete_profile', payload);

const loginWithSocialAccount = (params, payload) =>
  client.post('/login_with_social_account/' + params, payload);

const getCountries = () => client.get('/get_countries');

const me = () => client.get('/me');

const getGenres = () => client.get('/get_genres');

const getGenreContents = (id, page) =>
  client.get(`get_genre_contents/${id}?page=${page}`);

const like = payload => client.post('like', payload);

const unlike = payload => client.delete('like', payload);

const getContentDetails = id => client.get('content_details/' + id);

const getHomeData = () => client.get('/get_home_data');

const getDemands = () => client.get('/get_demands');

const getRecommmendedContents = payload =>
  client.post('/get_recommmended_contents', payload);

const getDemandDefaultIndex = id =>
  client.get(`/get_demand_default_index/${id}`);

const loadMoreDemandContents = (id, page, type) =>
  client.get(`/load_more_demand_contents/${id}?page=${page}&type=${type}`);

const updateViews = (id, payload) =>
  client.post(`/media/${id}/updateViews`, payload);

const getAppData = () => client.get('get_app_data');

const completeInterestStatus = payload =>
  client.post('/complete_interest_status', payload);

const getPackages = () => client.get('/get_packages');

const getStripeKey = () => client.get('/get_stripe_key');

const getClientSecret = values => client.post('/get_client_secret', values);

const subscribePackage = id => client.post('/subscribe_package/' + id);

const updateToken = values => client.post('/update_token', values);

const getNotifications = () => client.get('/get_notifications');

const changePassword = payload => client.post('/change_password', payload);

export default {
  signup,
  signin,
  sendOtp,
  sendEmailOtp,
  resetPassword,
  completeProfile,
  loginWithSocialAccount,
  getCountries,
  me,
  getGenres,
  getGenreContents,
  like,
  unlike,
  getContentDetails,
  getHomeData,
  getDemands,
  getRecommmendedContents,
  getDemandDefaultIndex,
  loadMoreDemandContents,
  updateViews,
  getAppData,
  completeInterestStatus,
  getPackages,
  getStripeKey,
  getClientSecret,
  subscribePackage,
  updateToken,
  getNotifications,
  changePassword,
};
