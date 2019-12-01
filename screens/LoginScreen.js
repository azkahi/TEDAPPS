import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text
} from "react-native";
import * as Font from 'expo-font';
import { Block, Button, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import Loading from '../components/Loading';

import { loadFontAsync } from '../utils/helper';

import Colors from '../constants/Colors';

export default class LoginScreen extends React.Component {
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

  goToHome = () => {
    this.props.navigation.navigate('Main');
  }

  render() {
    const { navigation } = this.props;

    if (this.state.loading) {
      return (<Loading />);
    } else {
      return (
        <Block flex style={styles.container}>
          <StatusBar hidden />
          <Block flex center>
          <ImageBackground
              source={require("../assets/images/login-bg.png")}
              style={{ height, width, zIndex: 1 }}
            />
          </Block>
          <Block center>
          </Block>
          <Block flex space="between" style={styles.padded}>
              <Block flex space="around" style={{ zIndex: 2 }}>
                <Block style={styles.title}>
                  <Block>
                    <Text style={styles.titleText}>
                      We The
                    </Text>
                  </Block>
                  <Block>
                    <Text style={styles.titleText}>
                      People 4.0
                    </Text>
                  </Block>
                  <Block style={styles.subtitle}>
                    <Text style={styles.subtitleText}>
                      Unbox Upskill Unleash!
                    </Text>
                  </Block>
                </Block>
                <Block center>
                  <Button
                    style={styles.button}
                    color={Colors.secondaryColor}
                    onPress={() => this.goToHome()}
                    textStyle={styles.buttonText}
                  >
                    Get Started
                  </Button>
                </Block>
            </Block>
          </Block>
        </Block>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 5,
    shadowOpacity: 0
  },
  buttonText: {
    color: 'white',
    fontFamily: 'UniviaPro-Black',
    fontSize: 16
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop:'-5%'
  },
  subtitle: {
    marginTop: 20
  },
  signInButton: {
    width: 250,
    height: 60,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 60,
    color: 'white',
    fontFamily: 'UniviaPro-Black'
  },
  subtitleText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'UniviaPro-Black'
  },
});
