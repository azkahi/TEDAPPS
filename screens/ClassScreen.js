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
  ScrollView,
  FlatList
} from "react-native";
import { Block } from 'galio-framework';
import * as Font from 'expo-font';

const { height, width } = Dimensions.get("screen");

import Loading from '../components/Loading';

import Card from '../components/Card';

import { loadFontAsync } from '../utils/helper';

import Colors from '../constants/Colors';

import People from '../constants/People';

export default class ClassScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Class',
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
      classItem: {},
      textColor: 'white'
    };
  }

  componentDidMount = async () => {
    await loadFontAsync();
    const classItem = this.props.navigation.getParam('classItem', {});

    if (classItem.textColor) {
      this.setState({ textColor: classItem.textColor });
    } else {
      this.setState({ textColor: Colors.primaryColor });
    }

    this.setState({ classItem, loading: false });
  }

  goToPerson = (personName) => {
    this.props.navigation.navigate('Person', { personName });
  }

  renderItem = (item) => {
    const { textColor } = this.state;

    if (People[item]) {
      return(
        <TouchableOpacity style={{ alignItems: 'center', marginBottom: 20 }} onPress={() => this.goToPerson(item)}>
          <Image
            source={People[item].image}
            resizeMode= 'center'
            style={{ width: 80, height: 80, borderRadius: 160 }}
          />
          <Text style={[styles.titleText, {fontSize: 16, color: textColor}]}>{item}</Text>
          <Text style={[styles.contentText, {fontSize: 12, margin: 0, color: textColor}]}>{People[item].title}</Text>
        </TouchableOpacity>
      );
    } else {
      <TouchableOpacity disabled style={{ alignItems: 'center', marginBottom: 20 }} onPress={() => this.goToPerson(item)}>
        <Image
          source={require('../assets/images/LogoTelkomsel.jpg')}
          resizeMode= 'center'
          style={{ width: 80, height: 80, borderRadius: 160 }}
        />
        <Text style={[styles.titleText, {fontSize: 16, color: textColor}]}>{item}</Text>
      </TouchableOpacity>
    }
  }

  render() {
    const { navigation } = this.props;
    const { classItem, textColor } = this.state;

    if (this.state.loading) {
      return (<Loading />);
    } else {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.cardContainer} showsVerticalScrollIndicator={false} >
            <Card item={classItem} key={classItem.key} horizontal disabled noMarginBottom />
            <View style={{alignItems: 'center'}}>
              <ImageBackground
                source={classItem.classBg}
                resizeMode='stretch'
                style={styles.imageContainer}
              >
              <Text style={[styles.contentText, {color: textColor}]}>{classItem.description}</Text>
              {
                classItem.moderator.length > 0 ?
                <View>
                  <Text style={[styles.titleText, {color: textColor}]}>Moderator</Text>
                  <FlatList
                    data={classItem.moderator}
                    renderItem={ ({ item }) => this.renderItem(item) }
                    keyExtractor={ item => item }
                    scrollEnabled={false}
                    contentContainerStyle={{ alignItems: 'center', marginTop: 10 }}
                  />
                </View>
                :
                null
              }
              {
                classItem.speaker.length > 0 ?
                <View>
                  <Text style={[styles.titleText, {color: textColor}]}>Speaker</Text>
                  <FlatList
                    data={classItem.speaker}
                    renderItem={ ({ item }) => this.renderItem(item) }
                    keyExtractor={ item => item }
                    scrollEnabled={false}
                    contentContainerStyle={{ justifyContent: 'space-around', alignItems: 'center', marginTop: 10 }}
                  />
                </View>
                :
                null
              }
              </ImageBackground>
            </View>
          </ScrollView>
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
  cardContainer: {
    margin: 15
  },
  imageContainer: {
    flex: 1,
    height: 1000,
    width: width - 60
  },
  titleText: {
    fontFamily: 'UniviaPro-Bold',
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  contentText: {
    fontFamily: 'UniviaPro-Black',
    color: 'white',
    fontSize: 14,
    margin: 10
  }
});
