import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  GenresScreen,
  Home,
  InterestExtraScreen,
  InterestsScreen,
  LoginScreen,
  Onboarding,
  OndemandScreen,
  PaymentScreen,
  PlanDetailsScreen,
  SignupScreen,
} from '../screens';
import {GenreScreen} from '../screens/root/genre';
import {SettingsScreen} from '../screens/root/settings';
import AuthContext from '../store/AuthContext';
import {VerifiedScreen} from '../screens/auth/verified';
import {AvailiblePlansScreen} from '../screens/root/plans';
import {ForgetPasswordScreen} from '../screens/auth/forgerPassword';
import {OtpScreen} from '../screens/auth/otp';
import {ResetPasswordScreen} from '../screens/auth/resetPassword';
import {SignupOtpScreen} from '../screens/auth/signupOtp';

const Stack = createStackNavigator();

export const AuthStack = () => {
  const {firstVisit} = useContext(AuthContext);
  // "interests";
  const checkInitialRoute = () =>
    firstVisit === 'yes' ? 'login' : 'onboarding';

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={checkInitialRoute()}>
      <Stack.Screen
        name="onboarding"
        component={Onboarding}
        options={{
          animationEnabled: false,
        }}
      />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          animationEnabled: false,
        }}
      />

      <Stack.Screen
        name="forgetPassword"
        component={ForgetPasswordScreen}
        options={{
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="otp"
        component={OtpScreen}
        options={{
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="signupotp"
        component={SignupOtpScreen}
        options={{
          animationEnabled: false,
        }}
      />

      <Stack.Screen
        name="resetPassword"
        component={ResetPasswordScreen}
        options={{
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="verified"
        component={VerifiedScreen}
        options={{
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="interests"
        component={InterestsScreen}
        options={{
          animationEnabled: false,
        }}
      />

      <Stack.Screen
        name="interestsExtra"
        component={InterestExtraScreen}
        options={{
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export const HomeStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
};

export const GenreStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="genresScreen" component={GenresScreen} />
      <Stack.Screen name="genre" component={GenreScreen} />
    </Stack.Navigator>
  );
};

export const OnDemandStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="demondScreen" component={OndemandScreen} />
    </Stack.Navigator>
  );
};

export const ConfigStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="settingScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export const PlanStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="plansStack">
      <Stack.Screen name="plansStack" component={AvailiblePlansScreen} />
      <Stack.Screen name="planDetails" component={PlanDetailsScreen} />
      <Stack.Screen name="payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};
