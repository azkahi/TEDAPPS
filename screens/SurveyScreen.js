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

import { classesDay1, classesDay2 } from '../constants/Classes';

import { loadFontAsync } from '../utils/helper';


const { width } = Dimensions.get('screen');

const satisfaction_rating = [
  { key: 1, label: '1' },
  { key: 2, label: '2' },
  { key: 3, label: '3' },
  { key: 4, label: '4' },
  { key: 5, label: '5' },
];

export default class SurveyScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Survey',
      headerStyle: {
        backgroundColor: Colors.primaryColor,
        borderColor: Colors.tintColor,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'UniviaPro-Bold',
        backgroundColor: Colors.secondaryColor,
        paddingHorizontal: 5
      },
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data_class: [],
      data_moderator: [],
      data_speaker: [],
      user: {},
      participant_type: '',
      favourite_session: '',
      favourite_speaker: '',
      favourite_moderator: '',
      new_cap: '',
      reason_new_cap: '',
      satisfaction: '',
      suggestion: '',
      next_session_suggestion: '',
    };
  }

  populateClass() {
    const classes = classesDay1.concat(classesDay2);

    let key_class = 1;
    let item_class = [];
    let key_moderator = 1;
    let item_moderator = [];
    let key_speaker = 1;
    let item_speaker = [];

    // First population
    classes.map((classItem) => {
      item_class.push(classItem.title);

      classItem.moderator.map((moderatorItem, index) => {
        if (moderatorItem) item_moderator.push(`${moderatorItem} - ${classItem.moderatorTitle[index]}`);
      });

      classItem.speaker.map((speakerItem, index) => {
        if (speakerItem) item_speaker.push(`${speakerItem} - ${classItem.speakerTitle[index]}`)
      })
    })

    let data_class = [{ key: 0, section: true, label: 'Session' }];
    let data_moderator = [{ key: 0, section: true, label: 'Moderator' }];
    let data_speaker = [{ key: 0, section: true, label: 'Speaker' }];

    item_class.map((classItem) => data_class.push({ key: key_class++, label: classItem}));
    item_moderator.map((moderatorItem) => data_moderator.push({ key: key_moderator++, label: moderatorItem}));
    item_speaker.map((speakerItem) => data_speaker.push({ key: key_speaker++, label: speakerItem}));

    this.setState({ data_class, data_moderator, data_speaker });
  }

  async componentDidMount() {
    await loadFontAsync();
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    this.populateClass();

    this.setState({ user, participant_type: user.user_type, loading: false });
  }

  createSurveyRequest = async () => {
    const { user, participant_type, favourite_session, favourite_speaker, favourite_moderator, new_cap, reason_new_cap, satisfaction, suggestion, next_session_suggestion } = this.state;
    const survey = { participant_type, favourite_session, favourite_speaker, favourite_moderator, new_cap, reason_new_cap, satisfaction, suggestion, next_session_suggestion };
    console.log(survey);

    try {
      await axios({
        method: 'post',
        url: 'https://pacific-bastion-26155.herokuapp.com/surveys',
        data: {
          id: user.id,
          survey
        }
      })
      .then(async (response) => {
        this.setState({ loading: false });
        Alert.alert(
          'Terima kasih telah mengisi survey',
          'Masukan anda telah kami terima',
          [
            { text: 'OK', onPress: () => this.props.navigation.goBack()},
          ],
          { cancelable: true }
        );
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
    const { participant_type, favourite_session, favourite_speaker, favourite_moderator, new_cap, reason_new_cap, satisfaction, suggestion, next_session_suggestion } = this.state;

    console.log({ participant_type, favourite_session, favourite_speaker, favourite_moderator, new_cap, reason_new_cap, satisfaction, suggestion, next_session_suggestion });

    if (!participant_type || !favourite_session || !favourite_speaker || !favourite_moderator || !new_cap || !reason_new_cap || !satisfaction || !suggestion || !next_session_suggestion) {
      Alert.alert(
        'All field must be filled.',
        '',
        [
          { text: 'OK' },
        ],
        { cancelable: true }
      );
    } else {
      this.setState({ loading: true }, () => this.createSurveyRequest());
    }
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    } else {
      const { data_class, data_moderator, data_speaker } = this.state;

      return (
        <View style={styles.container}>
          <Image
            source={require('../assets/images/TEDAPPS-logo.png')}
            resizeMode='contain'
            style={{ alignSelf: 'center', height: 50, width: 200, marginTop: 50, marginBottom: 10 }}
          />

        <KeyboardAvoidingView behavior='padding' enabled style={{ justifyContent: 'flex-end', flex: 1, marginHorizontal: 20, marginBottom: 5 }}>
            <ScrollView>
              <Text style={[styles.titleText, {fontSize: 20, marginTop: 20}]}>Favourite Session:</Text>
              <View style={{marginVertical: 10, height: 50, width: width - 40, backgroundColor: 'white' }}>
                <ModalSelector
                    data={data_class}
                    initValue="Select Session"
                    onChange={(option)=> { this.setState({ favourite_session: option.label }) }}>

                    <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:50}}
                        editable={false}
                        placeholder="Select session"
                        value={this.state.favourite_session} />

                </ModalSelector>
              </View>

              <Text style={[styles.titleText, {fontSize: 20, marginTop: 20}]}>Favourite Moderator:</Text>
              <View style={{marginVertical: 10, height: 50, width: width - 40, backgroundColor: 'white' }}>
                <ModalSelector
                    data={data_moderator}
                    initValue="Select Moderator"
                    onChange={(option)=> { this.setState({ favourite_moderator: option.label }) }}>

                    <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:50}}
                        editable={false}
                        placeholder="Select moderator"
                        value={this.state.favourite_moderator} />

                </ModalSelector>
              </View>

              <Text style={[styles.titleText, {fontSize: 20, marginTop: 20}]}>Favourite Speaker:</Text>
              <View style={{marginVertical: 10, height: 50, width: width - 40, backgroundColor: 'white' }}>
                <ModalSelector
                    data={data_speaker}
                    initValue="Select Speaker"
                    onChange={(option)=> { this.setState({ favourite_speaker: option.label }) }}>

                    <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:50}}
                        editable={false}
                        placeholder="Select speaker"
                        value={this.state.favourite_speaker} />

                </ModalSelector>
              </View>

              <Text style={[styles.titleText, {fontSize: 20, marginTop: 20}]}>New capability apa yang ingin anda kuasai?</Text>
              <View style={{marginVertical: 10, width: width - 40, backgroundColor: 'white' }}>
                <TextInput
                  style={{ height: 50, borderColor: Colors.primaryColor, borderBottomWidth: 1, paddingHorizontal: 10 }}
                  onChangeText={text => this.setState({ new_cap: text })}
                  value={this.state.new_cap}
                  keyboardType='default'
                />
              </View>

              <Text style={[styles.titleText, {fontSize: 20, marginTop: 20}]}>Apa alasannya?</Text>
              <View style={{marginVertical: 10, width: width - 40, backgroundColor: 'white' }}>
                <TextInput
                  style={{ height: 150, borderColor: Colors.primaryColor, borderBottomWidth: 1, paddingHorizontal: 10 }}
                  onChangeText={text => this.setState({ reason_new_cap: text })}
                  value={this.state.reason_new_cap}
                  multiline={true}
                  textAlignVertical='top'
                  keyboardType='default'
                />
              </View>

              <Text style={[styles.titleText, {fontSize: 20, marginTop: 20}]}>Dalam skala 1-5, seberapa puas anda dengan acara ini?</Text>
              <View style={{marginVertical: 10, height: 50, width: width - 40, backgroundColor: 'white' }}>
                <ModalSelector
                    data={satisfaction_rating}
                    initValue="Select Rating"
                    onChange={(option)=> { this.setState({ satisfaction: option.label }) }}>

                    <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:50}}
                        editable={false}
                        placeholder="Select rating"
                        value={this.state.satisfaction} />

                </ModalSelector>
              </View>

              <Text style={[styles.titleText, {fontSize: 20, marginTop: 20}]}>Saran:</Text>
              <View style={{marginVertical: 10, width: width - 40, backgroundColor: 'white' }}>
                <TextInput
                  style={{ height: 150, borderColor: Colors.primaryColor, borderBottomWidth: 1, paddingHorizontal: 10 }}
                  onChangeText={text => this.setState({ suggestion: text })}
                  value={this.state.suggestion}
                  multiline={true}
                  textAlignVertical='top'
                  keyboardType='default'
                />
              </View>

              <Text style={[styles.titleText, {fontSize: 20, marginTop: 20}]}>Usulan untuk materi acara selanjutnya:</Text>
              <View style={{marginVertical: 10, width: width - 40, backgroundColor: 'white' }}>
                <TextInput
                  style={{ height: 150, borderColor: Colors.primaryColor, borderBottomWidth: 1, paddingHorizontal: 10 }}
                  onChangeText={text => this.setState({ next_session_suggestion: text })}
                  value={this.state.next_session_suggestion}
                  multiline={true}
                  textAlignVertical='top'
                  keyboardType='default'
                />
              </View>

              <Button
                style={styles.button}
                color={Colors.secondaryColor}
                onPress={() => this.processInput()}
                textStyle={styles.buttonText}
              >
                Submit
              </Button>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      );
    }
  }
}

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
