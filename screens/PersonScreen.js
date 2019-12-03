import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  View,
  FlatList,
  TouchableOpacity,
  Text
} from "react-native";
import { Block, theme } from "galio-framework";
import ImageView from 'react-native-image-view';

import Loading from '../components/Loading';
import Card from '../components/Card';

import { loadFontAsync } from '../utils/helper';

import Colors from '../constants/Colors';

import People from '../constants/People';

import { classesDay1, classesDay2 } from '../constants/Classes';

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = (theme.SIZES.BASE * 3.5 + (StatusHeight || 0));

const { width, height } = Dimensions.get("screen");

class PersonScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Person',
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
      personName: 'AlamandaShantika',
      loading: true,
      isImageViewVisible: false,
      images: []
    };
  }

  onPressImage = () => {
    this.setState({ isImageViewVisible: !this.state.isImageViewVisible });
  }

  async componentDidMount() {
    await loadFontAsync();
    const personName = this.props.navigation.getParam('personName', 'AlamandaShantika');

    this.setState({
      personName,
      images: [{
        source: People[personName].image,
        width: width,
        height: width
      }],
      loading: false
    });
  }

  render() {
    const { isImageViewVisible, personName, images } = this.state;

    if (this.state.loading) {
      return (<Loading />);
    } else {
      return (
        <View style={styles.profile}>
          <Block flex center>
            <ImageBackground
              source={require("../assets/images/profile-screen-bg.png")}
              style={{ height, width, zIndex: 1 }}
            />
          </Block>
          <ScrollView showsVerticalScrollIndicator={false} style={{zIndex: 2}}>
                <View style={styles.profileCard}>
                    <Block middle style={styles.nameInfo}>
                      <TouchableOpacity onPress={() => this.onPressImage()}>
                        <Image
                          source={People[personName].image}
                          resizeMode='contain'
                          style={{ width: 80, height: 80, marginVertical: 10 }}
                        />
                      </TouchableOpacity>
                      <Text style={{fontFamily: 'UniviaPro-Bold', fontSize: 28, color: Colors.primaryColor, textAlign: 'center'}}>
                        {personName}
                      </Text>
                    </Block>
                    <Block middle style={{ marginTop: 20, marginBottom: 16 }}>
                      <Block style={styles.divider} />
                    </Block>
                    <Block
                      style={{ paddingVertical: 14, alignItems: "baseline" }}
                    >
                      <Text style={{marginLeft: 20, fontFamily: 'UniviaPro-Bold', fontSize: 18, color: Colors.primaryColor}}>
                        Profile
                      </Text>
                      <Text style={{marginHorizontal: 20, fontFamily: 'UniviaPro-Black', fontSize: 14, color: Colors.tintColor}}>
                        { People[personName].description }
                      </Text>
                    </Block>

                    <Block
                      row
                      style={{ paddingBottom: 20, justifyContent: "flex-end" }}
                    >
                    </Block>
                    <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                      <Block row space="between" style={{ flexWrap: "wrap" }}>
                      </Block>
                    </Block>
                </View>
            </ScrollView>
            <ImageView
                images={images}
                imageIndex={0}
                isVisible={this.state.isImageViewVisible}
                onClose={() => this.onPressImage()}
            />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  profile: {
    // backgroundColor: Colors.primaryColor
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height
  },
  profileCard: {
    flex: 1,
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 50,
    marginBottom: 30,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.tintColor,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  info: {
    paddingHorizontal: 40
  },
  nameInfo: {
    marginTop: 10
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  badgeContainer: {
    justifyContent: 'space-around'
  },
  qrButton: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primaryColor
  },
  qrButtonText: {
    fontFamily: 'UniviaPro-Black',
    color: Colors.primaryColor,
    marginTop: 10,
    fontSize: 14,
  },
  qrButtonImage: {
    height: 50,
    width: 50,
    tintColor: Colors.primaryColor
  }
});

export default PersonScreen;
