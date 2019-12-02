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
  AsyncStorage
} from 'react-native';
import TopBarNav from 'top-bar-nav';
import { Button, Block, theme } from 'galio-framework';
import axios from 'axios';

import Card from '../components/Card';
import Colors from '../constants/Colors';

import Loading from '../components/Loading';

import { loadFontAsync } from '../utils/helper';

import { classesDay1, classesDay2 } from '../constants/Classes';

const { width } = Dimensions.get('screen');

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      name: '',
      email: '',
      phone: '',
      type: '',
      expertise: ''
    };
  }

  async componentDidMount() {
    await loadFontAsync();
    this.setState({ loading: false });
  }

  createUserRequest = async () => {
    const { name, email, phone, type, expertise } = this.state;
    const user = { name, email, phone, user_type: type, expertise };

    try {
      await axios({
        method: 'post',
        url: 'https://pacific-bastion-26155.herokuapp.com/users',
        data: {
          user: user
        }
      })
      .then(async (response) => {
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        this.setState({ loading: false });
        this.props.navigation.navigate('Main');
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
    const { name, email, phone, type, expertise } = this.state;

    if (!name || !email || !phone || !type || !expertise) {
      Alert.alert(
        'All field must be filled.',
        '',
        [
          { text: 'OK' },
        ],
        { cancelable: true }
      );
    } else {
      this.setState({ loading: true });
      this.createUserRequest();
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
            resizeMode='center'
            style={{ alignSelf: 'center', height: 50, width: 200, marginTop: 50, marginBottom: 10 }}
          />
          <ScrollView>
            <View style={{ marginHorizontal: 20, marginBottom: 5 }}>
              <Text style={[styles.titleText, {fontSize: 20, marginTop: 20}]}>Name:</Text>
              <View style={{marginVertical: 10, width: width - 40, backgroundColor: 'white' }}>
                <TextInput
                  style={{ height: 50, borderColor: Colors.primaryColor, borderBottomWidth: 1, paddingHorizontal: 10 }}
                  onChangeText={text => this.setState({ name: text })}
                  value={this.state.name}
                  keyboardType='default'
                />
              </View>

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

              <Text style={[styles.titleText, {fontSize: 20, marginTop: 20}]}>Phone Number:</Text>
              <View style={{marginVertical: 10, width: width - 40, backgroundColor: 'white' }}>
                <TextInput
                  style={{ height: 50, borderColor: Colors.primaryColor, borderBottomWidth: 1, paddingHorizontal: 10 }}
                  onChangeText={text => this.setState({ phone: text })}
                  value={this.state.phone}
                  keyboardType='number-pad'
                  autoCompleteType='tel'
                />
              </View>


              <Text style={[styles.titleText, {fontSize: 20, marginTop: 20}]}>Type:</Text>
              <View style={{marginVertical: 10, height: 50, width: width - 40, backgroundColor: 'white' }}>
                <Picker
                  selectedValue={this.state.type}
                  onValueChange={(itemValue, itemIndex) => this.setState({ type: itemValue })}>
                  <Picker.Item label="" value="" />
                  <Picker.Item label="Student" value="Student" />
                  <Picker.Item label="Employee" value="Employee" />
                  <Picker.Item label="Community" value="Community" />
                </Picker>
              </View>

              <Text style={[styles.titleText, {fontSize: 20, marginTop: 20}]}>Expertise:</Text>
              <View style={{marginVertical: 10, height: 50, width: width - 40, backgroundColor: 'white', marginBottom: 30 }}>
                <Picker
                  selectedValue={this.state.expertise}
                  onValueChange={(itemValue, itemIndex) => this.setState({ expertise: itemValue })}>
                  <Picker.Item label="" value="" />
                  <Picker.Item label="UI/UX" value="UI/UX" />
                  <Picker.Item label="Data Science" value="Data Science" />
                  <Picker.Item label="Software Engineering" value="Software Engineering" />
                  <Picker.Item label="Others" value="Others" />
                </Picker>
              </View>
              <Button
                style={styles.button}
                color={Colors.secondaryColor}
                onPress={() => this.processInput()}
                textStyle={styles.buttonText}
              >
                Register
              </Button>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

RegisterScreen.navigationOptions = {
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
