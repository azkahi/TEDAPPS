import React from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import ImageView from 'react-native-image-view';

import Colors from '../constants/Colors';

import Loading from '../components/Loading';

import { loadFontAsync } from '../utils/helper';

const { height, width } = Dimensions.get('screen');

const images = [
  {
    source: require("../assets/images/venue.jpg"),
    height: height,
    width: 5528 / 7568 * height // Pre defined calculation for width according to image dimension
  },
];

class VenueScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isImageViewVisible: false,
      loading: true
    };
  }

  async componentDidMount() {
    await loadFontAsync();
    this.setState({ loading: false });
  }

  onPressVenue = () => {
    this.setState({ isImageViewVisible: !this.state.isImageViewVisible });
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.onPressVenue()}>
              <Image
                source={require("../assets/images/venue.jpg")}
                resizeMode='center'
                style={{ height: width * 7568 / 5528, width: width }}
              />
          </TouchableOpacity>
          <View>
            <Text style={styles.titleText}>Tap to Enlarge</Text>
          </View>
          <ImageView
              images={images}
              imageIndex={0}
              isVisible={this.state.isImageViewVisible}
              onClose={() => this.onPressVenue()}
          />
        </View>
      );
    }
  }
}

VenueScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#652E92'
  },
  titleText: {
    fontFamily: 'UniviaPro-Bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    padding: 15,
  }
});

export default VenueScreen;
