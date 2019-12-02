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
  Text,
  AsyncStorage,
  Alert,
  RefreshControl
} from "react-native";
import { Block, theme } from "galio-framework";
import axios from 'axios';

import Loading from '../components/Loading';
import Card from '../components/Card';

import { loadFontAsync } from '../utils/helper';

import Colors from '../constants/Colors';
import { classesDay1, classesDay2 } from '../constants/Classes';

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = (theme.SIZES.BASE * 3.5 + (StatusHeight || 0));

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const classList = [
  classesDay1,
  classesDay2
]

class MyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {},
      classes: [],
      refreshing: false
    };
  }

  async requestClassData(user) {
    console.log(user);

    try {
      await axios({
        method: 'post',
        url: 'https://pacific-bastion-26155.herokuapp.com/session_get',
        data: {
          id: user.id
        }
      })
      .then(async (response) => {
        console.log(response.data);
        this.setState({ loading: false, refreshing: false });
        this.setState({ classes: response.data });
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

  async componentDidMount() {
    await loadFontAsync();

    const user = JSON.parse(await AsyncStorage.getItem('user'));

    this.requestClassData(user);

    this.setState({ user });
  }

  goToScanQR() {
    this.props.navigation.navigate('QRScanner');
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.requestClassData(this.state.user);
  }

  renderCardClass(classItem) {
    const { classes } = this.state;

    let isAttended = false;

    classes.map((classData) => {
      if (classData.key == classItem.key) {
        isAttended = true;
      }
    });

    if (isAttended) {
      return (
        <Card item={classItem} key={classItem.key} horizontal ctaDisabled disabled />
      );
    } else {
      return (
        <Card item={classItem} key={classItem.key} horizontal ctaDisabled disabled disabledImage />
      );
    }
  }

  render() {
    const { user, classes, refreshing } = this.state;

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
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => this.onRefresh()} />
            }
            showsVerticalScrollIndicator={false}
            style={{zIndex: 2}}>
                <View style={styles.profileCard}>
                    <Block middle style={styles.nameInfo}>
                      <Text style={{fontFamily: 'UniviaPro-Bold', fontSize: 28, color: Colors.primaryColor}}>
                        {user.name}
                      </Text>
                    </Block>
                    <Block middle style={{marginTop: 20}}>
                      <Block middle>
                        <Text style={{ fontFamily: 'UniviaPro-Bold', color: Colors.tintColor, fontSize: 16, marginBottom: 4 }}>
                          {classes.length}
                        </Text>
                        <Text color={Colors.primaryColor} style={{ fontFamily: 'UniviaPro-Black', color: Colors.primaryColor, fontSize: 16 }} size={16}>Class Attended</Text>
                      </Block>
                    </Block>
                    <Block middle style={{ marginTop: 20, marginBottom: 16 }}>
                      <Block style={styles.divider} />
                    </Block>
                    <Block middle>
                      <TouchableOpacity style={styles.qrButton} onPress={() => this.goToScanQR()}>
                        <Image style={styles.qrButtonImage} source={require('../assets/images/qr-code.png')}/>
                        <Text color={Colors.primaryColor} style={styles.qrButtonText}>Scan QR</Text>
                      </TouchableOpacity>
                    </Block>
                    <Block middle style={{ marginTop: 20, marginBottom: 16 }}>
                      <Block style={styles.divider} />
                    </Block>
                    <Block
                      row
                      style={{ paddingVertical: 14, alignItems: "baseline" }}
                    >
                      <Text style={{marginLeft: 20, fontFamily: 'UniviaPro-Bold', fontSize: 16, color: Colors.primaryColor}}>
                        Badges
                      </Text>
                    </Block>

                    <View style={{ flex: 1, marginHorizontal: 20 }}>
                      <ScrollView>
                        { classList.map((classes) => (classes.map((classItem) => (this.renderCardClass(classItem))))) }
                      </ScrollView>
                    </View>

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
        </View>
      );
    }
  }
}

MyProfile.navigationOptions = {
  header: null,
};

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
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
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

export default MyProfile;
