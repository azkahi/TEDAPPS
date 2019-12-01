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
  Button
} from 'react-native';
import TopBarNav from 'top-bar-nav';
import { Block, theme } from 'galio-framework';

import Card from '../components/Card';
import Colors from '../constants/Colors';

import Loading from '../components/Loading';

import { loadFontAsync } from '../utils/helper';

import { classesDay1, classesDay2 } from '../constants/Classes';

const { width } = Dimensions.get('screen');

export default class TEDCastScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      expertise: ''
    };
  }

  async componentDidMount() {
    await loadFontAsync();
    this.setState({ loading: false });
  }

  startTEDCast = () => {
    const { expertise } = this.state;

    if (!expertise) {
      Alert.alert(
        'No Expertise Selected',
        'You must choose an expertise',
        [
          { text: 'OK' },
        ],
        { cancelable: true }
      );
    } else {

    }
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    } else {
      return (
        <View style={styles.container}>
          <Image
            source={require('../assets/images/TEDCAST-logo.png')}
            resizeMode='center'
            style={{ alignSelf: 'center', height: 50, width: 200, marginTop: 30, marginBottom: 10 }}
          />
          <ScrollView>
            <View style={{ marginHorizontal: 20, marginBottom: 5 }}>
              <Text style={styles.titleText}>TED Casting: Beat The 4.0</Text>
              <Text style={styles.contentText}>Sebagai bentuk implementasi rencana strategis New Capability Development, Telkomsel sebagai Leading Company dalam industri Digital & Telecomunication membuka kesempatan bagi Kalian yang ingin menjadi bagian dari THE PEOPLE 4.0 untuk bersama-sama mengakselerasikan pembangunan tenaga kerja Indonesia 4.0 yang berbasis pemanfaatan teknologi, khususnya pada bidang Data Science dan UI/UX.</Text>
              <Text style={[styles.titleText, {textAlign: 'center'}]}>Are you ready to beat 4.0 with us?</Text>
              <Text style={[styles.titleText, {textAlign: 'center'}]}>Register yourself now!</Text>

              <Text style={[styles.titleText, {fontSize: 20, marginTop: 20}]}>Expertise:</Text>

              <View style={{marginVertical: 10, height: 50, width: width - 40, backgroundColor: 'white' }}>
                <Picker
                  selectedValue={this.state.expertise}
                  onValueChange={(itemValue, itemIndex) => this.setState({ expertise: itemValue })}>
                  <Picker.Item label="" value="" />
                  <Picker.Item label="UI/UX" value="UI/UX" />
                  <Picker.Item label="Data Science" value="Data Science" />
                </Picker>
              </View>
              <Button
                style={styles.button}
                color={Colors.tintColor}
                onPress={() => this.startTEDCast()}
                textStyle={styles.buttonText}
                title='Register'
              >
              </Button>


              <Text style={[styles.subText, {marginTop: 40}]}>Disclaimer:</Text>
              <Text style={styles.subText}>For External Telkomsel:{'\n'}TED Casting merupakan salah satu kanal talent sourcing Telkomsel, kandidat potensial yang lolos TED Casting akan mendapatkan kesempatan mengikuti proses seleksi lebih lanjut untuk menjadi karyawan Telkomsel.</Text>
              <Text style={styles.subText}>For Internal Telkomsel:{'\n'}TED Casting merupakan salah satu media seleksi untuk dapat mengikuti Data Science Academy Cohort 2 di Telkomsel, apabila anda lulus dalam seleksi ini ada akan mendapatkan Golden Ticket langsung ketahapan interview dan Untuk UI/UX anda akan mendapatkan Ticket Idea Fest 2020.</Text>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

TEDCastScreen.navigationOptions = {
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
  },
  buttonText: {
    color: 'white',
    fontFamily: 'UniviaPro-Bold',
    fontSize: 16
  }
});
