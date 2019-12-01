import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ScrollView
} from "react-native";
import * as Font from 'expo-font';
import { theme } from "galio-framework";

import Loading from '../components/Loading';

import { loadFontAsync } from '../utils/helper';

import Colors from '../constants/Colors';

import People from '../constants/People';

const { height, width } = Dimensions.get("screen");

export default class SpeakerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    await loadFontAsync();
    this.setState({ loading: false });
  }

  goToPerson = (personName) => {
    this.props.navigation.navigate('Person', { personName });
  }

  renderItem = (item) => {
    const widthItem = (width - (theme.SIZES.BASE * 4)) / 2;

    return(
      <TouchableOpacity style={{ alignItems: 'center', marginBottom: 20, width: widthItem, paddingVertical: 10 }} onPress={() => this.goToPerson(item)}>
        <Image
          source={People[item].image}
          resizeMode= 'center'
          style={styles.imagePerson}
        />
      <Text style={[styles.nameText]}>{item}</Text>
        <Text style={styles.subtitleText}>{People[item].title}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { navigation } = this.props;

    if (this.state.loading) {
      return (<Loading />);
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground
              source={require("../assets/images/speaker-bg.jpg")}
              style={{ height, width }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.profileCard}>
                <FlatList
                  data={Object.keys(People)}
                  keyExtractor={ item => item }
                  renderItem={ ({ item }) => this.renderItem(item) }
                  scrollEnabled={false}
                  numColumns={2}
                  horizontal={false}
                  contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'center', marginTop: 20 }}
                />
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      );
    }
  }
}

SpeakerScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
  },
  profileCard: {
    flex: 1,
    paddingHorizontal: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 50,
    marginBottom: 120,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.tintColor,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  titleText: {
    fontFamily: 'UniviaPro-Bold',
    fontSize: 28,
    color: Colors.primaryColor,
    marginBottom: 20
  },
  nameText: {
    fontFamily: 'UniviaPro-Bold',
    fontSize: 18,
    color: Colors.primaryColor,
    textAlign: 'center'
  },
  subtitleText: {
    fontFamily: 'UniviaPro-Black',
    fontSize: 14,
    color: Colors.tintColor,
    textAlign: 'center'
  },
  imagePerson: {
    width: 80,
    height: 80,
    borderRadius: 160,
  }
});
