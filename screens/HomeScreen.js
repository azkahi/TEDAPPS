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
  FlatList
} from 'react-native';
import TopBarNav from 'top-bar-nav';
import { Block, theme } from 'galio-framework';

import Card from '../components/Card';
import Colors from '../constants/Colors';

import Loading from '../components/Loading';

import { loadFontAsync } from '../utils/helper';

import { classesDay1, classesDay2 } from '../constants/Classes';

const { width } = Dimensions.get('screen');

const Scene = ({ index }) => {
  const classList = [
    classesDay1,
    classesDay2
  ]

  return (
    <Block flex style={styles.home}>
      <ScrollView>
        { classList[index].map((classItem) => (<Card item={classItem} key={classItem.key} horizontal />)) }
      </ScrollView>
    </Block>
  );
}

const ROUTES = {
	Scene
};

const ROUTESTACK = [
  { element: <Text style={{ fontFamily: 'UniviaPro-Bold', fontSize: 14, color: 'white', backgroundColor: Colors.secondaryColor, paddingHorizontal: 5 }}>Day 1</Text>, title: 'Scene' },
  { element: <Text style={{ fontFamily: 'UniviaPro-Bold', fontSize: 14, color: 'white', backgroundColor: Colors.secondaryColor, paddingHorizontal: 5 }}>Day 2</Text>, title: 'Scene' },
];

export default class HomeScreen extends React.Component {
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

  goToClassScreen = (classItem) => {
    this.props.navigation.navigate('Class', { classItem, fontFamily: 'UniviaPro-Bold' });
  }

  renderScene = (index) => {
    const classList = [
      classesDay1,
      classesDay2
    ]

    return (
      <Block flex style={styles.home}>
        <ScrollView>
          { classList[index].map((classItem) => (<Card item={classItem} key={classItem.key} centered horizontal ctaDisabled onPress={() => this.goToClassScreen(classItem)}/>)) }
        </ScrollView>
      </Block>
    );
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    } else {
      return (
        <View style={styles.container}>
          <StatusBar hidden />
  				<TopBarNav
  					// routeStack and renderScene are required props
  					routeStack={ROUTESTACK}
  					renderScene={(route, i) => {
  						// This is a lot like the now deprecated Navigator component
  						return this.renderScene(i);
  					}}
  					// Below are optional props
  					headerStyle={[styles.headerStyle, { paddingTop: 40 }]} // probably want to add paddingTop if using TopBarNav for the  entire height of screen to account for notches/status bars
  					labelStyle={styles.labelStyle}
  					underlineStyle={styles.underlineStyle}
  					sidePadding={40} // Can't set sidePadding in headerStyle because it's needed to calculate the width of the tabs
  					inactiveOpacity={1}
  					fadeLabels={true}
  				/>
  			</View>
      );
    }
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});
