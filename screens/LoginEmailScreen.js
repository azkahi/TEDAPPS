import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar,
  FlatList,
  Picker,
  TextInput,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import TopBarNav from 'top-bar-nav';
import { Button, Block, theme } from 'galio-framework';
import axios from 'axios';
import ModalSelector from 'react-native-modal-selector';

import Card from '../components/Card';
import Colors from '../constants/Colors';

import Loading from '../components/Loading';

import { loadFontAsync } from '../utils/helper';

import { classesDay1, classesDay2 } from '../constants/Classes';

const { width } = Dimensions.get('screen');

export default class LoginEmailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      email: '',
    };
  }

  async componentDidMount() {
    await loadFontAsync();
    this.setState({ loading: false });
  }

  getUserRequest = async () => {
    const { email } = this.state;

    try {
      await axios({
        method: 'post',
        url: 'https://pacific-bastion-26155.herokuapp.com/login',
        data: {
          email
        }
      })
      .then(async (response) => {
        if (response.data) {
          await AsyncStorage.setItem('user', JSON.stringify(response.data));
          this.setState({ loading: false });
          this.props.navigation.navigate('Main');
        } else {
          Alert.alert(
            'No Email found',
            'Please check your email and try again.',
            [
              { text: 'OK', onPress: () => this.setState({ loading: false }) },
            ],
            { cancelable: true }
          );
        }
      })
      .catch((error) =>{
        this.setState({ loading: false });
        Alert.alert(
          'ERROR',
          error.toString(),
          [
            { text: 'OK' },
          ],
          { cancelable: true }
        );
      })

    } catch (error) {
      this.setState({ loading: false });
      Alert.alert(
        'ERROR',
        error.toString(),
        [
          { text: 'OK' },
        ],
        { cancelable: true }
      );
    }
  }

  processInput() {
    const { email } = this.state;

    if (!email) {
      console.log(study);
      Alert.alert(
        'You must provide an email.',
        '',
        [
          { text: 'OK' },
        ],
        { cancelable: true }
      );
    } else {
      this.setState({ loading: true });
      this.getUserRequest();
    }
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    } else {
      return (
        <View style={styles.container}>
          <Image
            source={require('../assets/images/TEDAPPS-logo.png')}
            resizeMode='contain'
            style={{ alignSelf: 'center', height: 50, width: 200, marginTop: 50, marginBottom: 10 }}
          />

        <KeyboardAvoidingView behavior='padding' enabled style={{ justifyContent: 'flex-end', flex: 1, marginHorizontal: 20, marginBottom: 5 }}>
              <Text style={[styles.titleText, {fontSize: 20, marginTop: 20}]}>E-mail:</Text>
              <View style={{marginVertical: 10, width: width - 40, backgroundColor: 'white' }}>
                <TextInput
                  style={{ height: 50, borderColor: Colors.primaryColor, borderBottomWidth: 1, paddingHorizontal: 10 }}
                  onChangeText={text => this.setState({ email: text })}
                  value={this.state.email}
                  keyboardType='email-address'
                  autoCompleteType='email'
                />
              </View>

              <Button
                style={styles.button}
                color={Colors.secondaryColor}
                onPress={() => this.processInput()}
                textStyle={styles.buttonText}
              >
                Login
              </Button>
          </KeyboardAvoidingView>
        </View>
      );
    }
  }
}

LoginEmailScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackgroundColor,
  },
  headerStyle: {
		borderBottomWidth: 1,
		borderColor: Colors.tintColor,
		backgroundColor: Colors.primaryColor
	},
	labelStyle: {
		fontSize: 15,
    fontFamily: 'UniviaPro-Bold',
		color: Colors.secondaryColor
	},
	underlineStyle: {
		height: 3.6,
		backgroundColor: Colors.tintColor,
		width: 70
	},
  home: {
    width: width,
    backgroundColor: Colors.mainBackgroundColor,
    paddingHorizontal: 10,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  titleText: {
    fontFamily: 'UniviaPro-Bold',
    color: 'white',
    fontSize: 28,
    marginTop: 15
  },
  contentText: {
    marginTop: 15,
    fontSize: 14,
    fontFamily: 'UniviaPro-Black',
    color: 'white',
    backgroundColor: Colors.secondaryColor,
    padding: 10,
  },
  subText: {
    marginTop: 3,
    fontSize: 12,
    fontFamily: 'UniviaPro-Black',
    color: 'white',
    textAlign: 'left'
  },
  button: {
    padding: 10,
    marginBottom: 15
  },
  buttonText: {
    color: 'white',
    fontFamily: 'UniviaPro-Bold',
    fontSize: 16
  }
});
