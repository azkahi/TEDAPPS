import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Alert,
  AsyncStorage
} from 'react-native';

import Colors from '../constants/Colors';

import Loading from '../components/Loading';

export default class AuthLoadingScreen extends React.Component {
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        this.props.navigation.navigate('Main');
      } else {
        this.props.navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert(
        'ERROR',
        error.toString(),
        [
          { text: 'OK' },
        ],
        { cancelable: true }
      );
    }
  };

  componentDidMount() {
    this.retrieveData();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Image
          source={require('../assets/images/TEDAPPS-logo.png')}
          resizeMode='center'
          style={{ alignSelf: 'center', height: 50, width: 200, marginBottom: 30 }}
        />
        <ActivityIndicator size="large" color={Colors.secondaryColor} />
      </View>
    );
  }
}

AuthLoadingScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
