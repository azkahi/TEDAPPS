import React from 'react';
import { ScrollView, StyleSheet, View, ImageBackground, Dimensions, Text, Alert, RefreshControl } from 'react-native';
import { Block, theme } from "galio-framework";
import TopBarNav from 'top-bar-nav';
import axios from 'axios';

import Colors from '../constants/Colors';
import Leaderboard from '../components/Leaderboard';

const { width, height } = Dimensions.get("screen");

import Loading from '../components/Loading';

const ROUTESTACK = [
  { element: <Text style={{ fontSize: 14, color: 'white', backgroundColor: Colors.secondaryColor, paddingHorizontal: 5 }}>Data Science</Text>, title: 'Scene' },
  { element: <Text style={{ fontSize: 14, color: 'white', backgroundColor: Colors.secondaryColor, paddingHorizontal: 5 }}>UI/UX</Text>, title: 'Scene' },
];

export default class LeaderboardScreen extends React.Component {
  state = {
    'DS': [
        {userName: 'joe@gmail.com', highScore: 52},
        {userName: 'jenny@gmail.com', highScore: 120},
    ],
    'UI/UX': [
      {userName: 'joe@gmail.com', highScore: 52},
      {userName: 'jenny@gmail.com', highScore: 120},
    ],
    loading: true
  }

  getScoreData = async (type) => {
    console.log('Getting Data');

    try {
      await axios({
        method: 'post',
        url: 'https://pacific-bastion-26155.herokuapp.com/show_score',
        data: {
          score_type: type
        }
      })
      .then(async (response) => {
        console.log(response.data);
        this.setState({ loading: false, refreshing: false });
        this.setState({ [type]: response.data });
      })
      .catch((error) => {
        this.setState({ loading: false, refreshing: false });
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
      this.setState({ loading: false, refreshing: false });
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

  componentDidMount = async () => {
    await this.getScoreData('UI/UX');
    await this.getScoreData('DS');
    this.setState({ loading: false });
    this.interval = setInterval(() => {
      this.getScoreData('UI/UX');
      this.getScoreData('DS');
    }, 30000);
  }

   renderScene = (index) => (
    <View style={{flex: 1}}>
      <Block flex center>
        <ImageBackground
          source={index == 0 ? require("../assets/images/bg.png") : require("../assets/images/register-bg.png")}
          style={{ height, width, zIndex: 1 }}
        />
      </Block>

      <View style={styles.profileCard}>
        <Leaderboard
          data={index == 0 ? this.state['UI/UX'] : this.state['DS']}
          sortBy='score'
          labelBy='username'
          oddRowColor={Colors.tintColor}
          evenRowColor={Colors.secondaryColor}
          rankStyle={{color: 'white'}}
          labelStyle={{color: 'white'}}
          scoreStyle={{color: 'white'}}
          sort={(item) => item}
          containerStyle={styles.leaderboardContainer}
          />
      </View>
    </View>
  );

  render() {
    return (
      <>
        { this.state.loading ? <Loading /> :
          <View style={styles.container}>
              <TopBarNav
                // routeStack and renderScene are required props
                routeStack={ROUTESTACK}
                renderScene={(route, i) => {
                  // This is a lot like the now deprecated Navigator component
                  return this.renderScene(i);
                }}
                // Below are optional props
                headerStyle={[styles.headerStyle, { paddingTop: 60 }]} // probably want to add paddingTop if using TopBarNav for the  entire height of screen to account for notches/status bars
                labelStyle={styles.labelStyle}
                underlineStyle={styles.underlineStyle}
                sidePadding={40} // Can't set sidePadding in headerStyle because it's needed to calculate the width of the tabs
                inactiveOpacity={1}
                fadeLabels={true}
              />
          </View>
      }
      </>
    );
  }
}

LeaderboardScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileCard: {
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.mainBackgroundColor,
    backgroundColor: Colors.mainBackgroundColor,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  leaderboardContainer: {
    borderColor: Colors.mainBackgroundColor,
    borderWidth: 0,
    borderRadius: 0
  },
  headerStyle: {
		borderBottomWidth: 1,
		borderColor: Colors.tintColor,
		backgroundColor: Colors.primaryColor
	},
	labelStyle: {
		fontSize: 15,
		fontWeight: '500',
		color: Colors.secondaryColor
	},
	underlineStyle: {
		height: 3.6,
		backgroundColor: Colors.tintColor,
		width: 40
	},
});
