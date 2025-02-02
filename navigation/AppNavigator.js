import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginEmailScreen from '../screens/LoginEmailScreen';


export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Login: LoginScreen,
    LoginEmail: LoginEmailScreen,
    Register: RegisterScreen,
    Main: MainTabNavigator,
  }, {
    initialRouteName: 'AuthLoading'
  })
);
