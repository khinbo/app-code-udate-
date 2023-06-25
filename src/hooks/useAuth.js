/* eslint-disable curly */
import {useCallback, useContext, useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import jwt_decode from 'jwt-decode';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AuthContext from '../store/AuthContext';
import server from '../server';
import localStorage from '../server/localStorage';
import toast from '../toast';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import helpers from '../constants/helpers';
import {changeLanguage, setLanguage} from '../I18n';

const useAuth = () => {
  const navigation = useNavigation();
  const {trigger} = useContext(AuthContext);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    GoogleSignin.configure({});
  }, []);

  const getCountries = useCallback(() => {
    setInitialLoading(true);
    server.getCountries().then(resp => {
      setInitialLoading(false);
      if (!resp.ok) toast.show(resp.data?.message);
      else setCountries(resp.data);
    });
  }, []);

  const signin = useCallback(
    values => {
      Keyboard.dismiss();
      setLoading(true);
      server.signin(values).then(resp => {
        localStorage.getPushToken().then(token => {
          server.updateToken({push_token: token});
        });
        setLoading(false);
        if (!resp.ok) {
          if (resp.data?.message === 'pending') {
            localStorage.saveToken(resp.data?.access_token).then(() => {
              if (resp.data.type === 'profile') {
                navigation.navigate('verified', {
                  user: resp.data.user,
                });
              } else {
                navigation.navigate('interests');
              }
            });
          } else helpers.apiResponseErrorHandler(resp);
        } else updateUser(resp.data.access_token, resp.data.user);
      });
    },
    [navigation, updateUser],
  );

  const signup = useCallback(
    values => {
      Keyboard.dismiss();
      const payload = {
        ...values,
        dob: moment(values.dob).format('YYYY-MM-DD'),
      };
      setLoading(true);
      server.signup(payload).then(resp => {
        setLoading(false);
        if (!resp.ok) {
          if (resp.data?.message === 'pending') {
            localStorage.saveToken(resp.data?.access_token).then(() => {
              if (resp.data.type === 'profile') {
                navigation.navigate('verified', {
                  user: resp.data.user,
                });
              } else {
                navigation.navigate('interests');
              }
            });
          } else helpers.apiResponseErrorHandler(resp);
        } else updateUser(resp.data.access_token, resp.data.user);
      });
    },
    [navigation, updateUser],
  );

  const completeProfile = useCallback(
    values => {
      Keyboard.dismiss();
      const payload = {
        ...values,
        dob: moment(values.dob).format('YYYY-MM-DD'),
      };
      setLoading(true);
      server.completeProfile(payload).then(resp => {
        setLoading(false);
        if (!resp.ok) {
          if (resp.data?.message === 'pending') {
            localStorage.saveToken(resp.data?.access_token).then(() => {
              if (resp.data.type === 'profile') {
                navigation.navigate('verified', {
                  user: resp.data.user,
                });
              } else {
                navigation.navigate('interests');
              }
            });
          } else helpers.apiResponseErrorHandler(resp);
        } else updateUser(resp.data.access_token, resp.data.user);
      });
    },
    [navigation, updateUser],
  );

  const loginWithApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    const {user, email, fullName, authorizationCode} = appleAuthRequestResponse;

    const name = fullName.givenName ? fullName.givenName : fullName.middleName;

    let payload = null;

    if (email != null) {
      payload = {
        identityToken: user,
        email,
        name,
      };
    } else {
      const response = jwt_decode(appleAuthRequestResponse.identityToken);
      payload = {
        identityToken: user,
        email: response.email,
        name,
      };
    }

    server.appleLogin(payload).then(resp => {
      setLoading(false);
      if (!resp.ok) {
        if (resp.data?.message === 'pending') {
          localStorage.saveToken(resp.data?.access_token).then(() => {
            if (resp.data.type === 'profile') {
              navigation.navigate('verified', {
                user: resp.data.user,
              });
            } else {
              navigation.navigate('interests');
            }
          });
        } else helpers.apiResponseErrorHandler(resp);
      } else updateUser(resp.data.access_token, resp.data.user);
    });
  };

  const completeInterestStatus = useCallback(
    values => {
      Keyboard.dismiss();
      const payload = {
        categories: JSON.stringify(values),
      };
      setLoading(true);
      server.completeInterestStatus(payload).then(resp => {
        setLoading(false);
        if (!resp.ok) {
          if (resp.data?.message === 'pending') {
            localStorage.saveToken(resp.data?.access_token).then(() => {
              if (resp.data.type === 'profile') {
                navigation.navigate('verified', {
                  user: resp.data.user,
                });
              } else {
                navigation.navigate('interests');
              }
            });
          } else helpers.apiResponseErrorHandler(resp);
        } else updateUser(resp.data.access_token, resp.data.user);
      });
    },
    [navigation, updateUser],
  );

  const loginWithGoogle = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signInSilently();

      if (userInfo) {
        console.log('Before sign in', userInfo);
        const {
          user: {id, name, email, photo},
        } = userInfo;
        loginWithSocialAccount('google', {id, name, email, photo});
      } else {
        // User is not signed in or their token has expired
        try {
          const userInfo = await GoogleSignin.signIn();
          console.log('After sign in', userInfo);
          const {
            user: {id, name, email, photo},
          } = userInfo;
          loginWithSocialAccount('google', {id, name, email, photo});
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            // User needs to sign in again, display a message to prompt them to sign in
            toast.show('User needs to sign in again');
          } else {
            // Handle other errors
            toast.show(JSON.stringify(error));
            console.log('Error', error);
            setLoading(false);
          }
        }
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // Handle sign-in cancelled error
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Handle sign-in already in progress error
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Handle Google Play Services not available error
      } else {
        // Handle other errors
        toast.show(JSON.stringify(error));
        console.log('Error', error);
        setLoading(false);
      }
    }
  }, []);

  const loginWithFacebook = useCallback(async () => {
    LoginManager.setLoginBehavior('web_only');
    try {
      const result = await LoginManager.logInWithPermissions([
        'email',
        'public_profile',
        'user_friends',
      ]);
      if (result.isCancelled) {
        return;
      }
      const token = await AccessToken.getCurrentAccessToken();
      if (
        result.declinedPermissions &&
        result.declinedPermissions.includes('email')
      )
        return toast.show('No permission for email , Email is required.');
      const infoRequest = new GraphRequest(
        '/me?fields=email,name,picture',
        null,
        (error, user) => {
          if (error) {
            console.log(error);
          } else {
            const {
              name,
              email,
              id,
              picture: {
                data: {url},
              },
            } = user;
            loginWithSocialAccount('facebook', {
              id,
              name,
              email,
              photo: url,
            });
          }
        },
      );
      if (token && !token.expired) {
        new GraphRequestManager().addRequest(infoRequest).start();
      } else {
        const refreshedToken =
          await AccessToken.refreshCurrentAccessTokenAsync();
        if (refreshedToken) {
          new GraphRequestManager().addRequest(infoRequest).start();
        } else {
          toast.show('Failed to refresh access token.');
        }
      }
    } catch (error) {
      console.log(error);
      toast.show(JSON.stringify(error));
    }
  }, []);

  function loginWithSocialAccount(provider, payload) {
    setLoading(true);
    server.loginWithSocialAccount(provider, payload).then(resp => {
      setLoading(false);
      if (!resp.ok) {
        if (resp.data?.message === 'pending') {
          localStorage.saveToken(resp.data?.access_token).then(() => {
            if (resp.data.type === 'profile') {
              navigation.navigate('verified', {
                user: resp.data.user,
              });
            } else {
              navigation.navigate('interests');
            }
          });
        } else helpers.apiResponseErrorHandler(resp);
      } else updateUser(resp.data.access_token, resp.data.user);
    });
  }

  const changePassword = useCallback(values => {
    setLoading(true);
    server.changePassword(values).then(resp => {
      setLoading(false);
      if (!resp.ok) {
        return helpers.apiResponseErrorHandler(resp);
      }
      toast.show(resp.data?.message ?? 'success');
    });
  }, []);

  const updateUser = useCallback(
    (token, user) => {
      localStorage.saveToken(token).then(async () => {
        await localStorage.saveIsFirstTime();
        changeLanguage('fr');
        setLanguage('fr');
        await localStorage.saveLang('fr');
        trigger.signin(user);
      });
    },
    [trigger],
  );

  const deleteAccount = useCallback(async () => {
    setLoading(true);
    const response = await server.deleteAccount();
    if (!response.ok) {
      return helpers.apiResponseErrorHandler(response);
    }
    trigger.signout();
  }, [trigger]);

  return {
    signin,
    signup,
    completeProfile,
    getCountries,
    loginWithFacebook,
    loginWithGoogle,
    loginWithApple,
    completeInterestStatus,
    changePassword,
    deleteAccount,
    initialLoading,
    loading,
    countries,
  };
};

export default useAuth;
