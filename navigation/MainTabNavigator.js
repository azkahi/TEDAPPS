import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import QRScannerScreen from '../screens/QRScannerScreen';
import SpeakerScreen from '../screens/SpeakerScreen';
import VenueScreen from '../screens/VenueScreen';
import ClassScreen from '../screens/ClassScreen';
import PersonScreen from '../screens/PersonScreen';
import TEDCastScreen from '../screens/TEDCastScreen';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Class: ClassScreen,
    Person: PersonScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Schedule',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-calendar' : 'md-calendar'
      }
    />
  ),
};

HomeStack.path = '';

const LeaderboardStack = createStackNavigator(
  {
    LeaderBoard: LeaderboardScreen,
  },
  config
);

LeaderboardStack.navigationOptions = {
  tabBarLabel: 'Leaderboard',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-clipboard'} />
  ),
};

LeaderboardStack.path = '';

const MyProfileStack = createStackNavigator(
  {
    MyProfile: MyProfileScreen,
    QRScanner: QRScannerScreen
  },
  config
);

MyProfileStack.navigationOptions = {
  tabBarLabel: 'My Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

MyProfileStack.path = '';

const SpeakerStack = createStackNavigator(
  {
    Speaker: SpeakerScreen,
    Person: PersonScreen
  },
  config
);

SpeakerStack.navigationOptions = {
  tabBarLabel: 'Speaker',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'} />
  ),
};

SpeakerStack.path = '';

const VenueStack = createStackNavigator(
  {
    Venue: VenueScreen,
  },
  config
);

VenueStack.navigationOptions = {
  tabBarLabel: 'Venue',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'} />
  ),
};

VenueStack.path = '';

const TedCastStack = createStackNavigator(
  {
    TEDCast: TEDCastScreen,
  },
  config
);

TedCastStack.navigationOptions = {
  tabBarLabel: 'TEDCast',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-mic' : 'md-mic'} />
  ),
};

TedCastStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SpeakerStack,
  VenueStack,
  LeaderboardStack,
  TedCastStack,
  MyProfileStack,
},
{
  tabBarOptions: {
    activeTintColor: Colors.secondaryColor,
    style: {
      backgroundColor: Colors.primaryColor,
    },
  }
});

tabNavigator.path = '';

export default tabNavigator;
