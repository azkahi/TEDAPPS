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

const data_expertise = [
  { key: 0, section: true, label: 'Background Education' },
  { key: 1, label: 'UI/UX' },
  { key: 2, label: 'Data Science' },
  { key: 3, label: 'Others' },
];

const data_type = [
  { key: 0, section: true, label: 'Type' },
  { key: 1, label: 'Student' },
  { key: 2, label: 'Employee' },
  { key: 3, label: 'Community' },
];


export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      name: '',
      email: '',
      phone: '',
      type: '',
      expertise: '',
      study: ''
    };
  }

  async componentDidMount() {
    await loadFontAsync();
    this.setState({ loading: false });
  }

  createUserRequest = async () => {
    const { name, email, phone, type, expertise, study } = this.state;
    const user = { name, email, phone, user_type: type, expertise: expertise == 'Others' ? study : expertise };
    console.log(user);

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
    const { name, email, phone, type, expertise, study } = this.state;

    if (expertise == 'Others' && !study) {
      console.log(study);
      Alert.alert(
        'All field must be filled.',
        '',
        [
          { text: 'OK' },
        ],
        { cancelable: true }
      );
    } else if (!name || !email || !phone || !type || !expertise) {
      console.log(study);
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
            resizeMode='contain'
            style={{ alignSelf: 'center', height: 50, width: 200, marginTop: 50, marginBottom: 10 }}
          />

        <KeyboardAvoidingView behavior='padding' enabled style={{ justifyContent: 'flex-end', flex: 1, marginHorizontal: 20, marginBottom: 5 }}>
            <ScrollView>
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
                <ModalSelector
                    data={data_type}
                    initValue="Select type"
                    onChange={(option)=> { this.setState({ type: option.label }) }}>

                    <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:50}}
                        editable={false}
                        placeholder="Select type"
                        value={this.state.type} />

                </ModalSelector>
              </View>

              <Text style={[styles.titleText, {fontSize: 20, marginTop: 20}]}>Background Education:</Text>
              <View style={{marginVertical: 10, height: 50, width: width - 40, backgroundColor: 'white', marginBottom: 30 }}>
                <ModalSelector
                    data={data_expertise}
                    initValue="Select background education"
                    onChange={(option)=> { this.setState({ expertise: option.label }) }}>

                    <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:50}}
                        editable={false}
                        placeholder="Select type"
                        value={this.state.expertise} />

                </ModalSelector>
              </View>

              {
                this.state.expertise == "Others" ?
                <>
                  <Text style={[styles.titleText, {fontSize: 20, marginTop: -10}]}>Major Study:</Text>
                  <View style={{marginVertical: 10, width: width - 40, backgroundColor: 'white', marginBottom: 30 }}>
                    <TextInput
                      style={{ height: 50, borderColor: Colors.primaryColor, borderBottomWidth: 1, paddingHorizontal: 10 }}
                      onChangeText={text => this.setState({ study: text })}
                      value={this.state.study}
                      keyboardType='default'
                    />
                  </View>
                </>
                :
                null
              }

              <Button
                style={styles.button}
                color={Colors.secondaryColor}
                onPress={() => this.processInput()}
                textStyle={styles.buttonText}
              >
                Register
              </Button>
            </ScrollView>
          </KeyboardAvoidingView>
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
