import {useCallback, useContext, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {
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

export default useAuth = () => {
  const navigation = useNavigation();
  const {trigger} = useContext(AuthContext);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // GoogleSignin.configure({
      // webClientId: '340401308963-0vbvsk51a0pn5amrmntkatd2n1de8dg9.apps.googleusercontent.com',
      // offlineAccess: true
  // });
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

  const signin = useCallback(values => {
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
        } else toast.show(resp.data?.message);
      } else updateUser(resp.data.access_token, resp.data.user);
    });
  }, []);

  const signup = useCallback(values => {
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
        } else
          resp.status === 422
            ? toast.show(resp.data[0])
            : toast.show(resp.data?.message);
      } else updateUser(resp.data.access_token, resp.data.user);
    });
  }, []);

  const completeProfile = useCallback(values => {
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
        } else
          resp.status === 422
            ? toast.show(resp.data[0])
            : toast.show(resp.data?.message);
      } else updateUser(resp.data.access_token, resp.data.user);
    });
  }, []);

  const completeInterestStatus = useCallback(values => {
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
        } else
          resp.status === 422
            ? toast.show(resp.data[0])
            : toast.show(resp.data?.message);
      } else updateUser(resp.data.access_token, resp.data.user);
    });
  }, []);

 
  const loginWithGoogle = useCallback(async () => {
    
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log("Before sign in",userInfo);
      const {
        user: {id, name, email, photo},
      } = userInfo;
      loginWithSocialAccount('google', {id, name, email, photo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      } else {
        toast.show(JSON.stringify(error));
        console.log("Error", error);
        setLoading(false)
      }
    }
  }, []);

  const loginWithFacebook = useCallback(() => {
    LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      function (result) {
        if (result.isCancelled) {
        }
        if (
          result.declinedPermissions &&
          result.declinedPermissions.includes('email')
        )
          toast.register_failed('No permission for email , Email is required.');
        else {
          const infoRequest = new GraphRequest(
            '/me?fields=email,name,picture',
            null,
            (error, user) => {
              if (error) {
                console.log(error);
                toast.show(JSON.stringify(error));
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
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      function (error) {
        console.log(error);
      },
    );
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
        } else
          resp.status === 422
            ? toast.show(resp.data[0])
            : toast.show(resp.data?.message);
      } else updateUser(resp.data.access_token, resp.data.user);
    });
  }

  const changePassword = useCallback(values => {
    setLoading(true);
    server.changePassword(values).then(resp => {
      setLoading(false);
      if (!resp.ok) return toast.show(resp?.data?.message ?? 'error');
      toast.show(resp.data?.message ?? 'success');
    });
  }, []);

  function updateUser(token, user) {
    localStorage.saveToken(token).then(async () => {
      await localStorage.saveIsFirstTime();
      trigger.signin(user);
    });
  }

  return {
    signin,
    signup,
    completeProfile,
    getCountries,
    loginWithFacebook,
    loginWithGoogle,
    completeInterestStatus,
    changePassword,
    initialLoading,
    loading,
    countries,
  };
};
