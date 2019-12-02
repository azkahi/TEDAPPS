import * as React from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Colors from '../constants/Colors';
import axios from 'axios';

import Loading from '../components/Loading';
import Card from '../components/Card';

import { loadFontAsync } from '../utils/helper';

export default class QRScannerScreen extends React.Component {
  static navigationOptions = {
    title: 'Scan QR',
    headerStyle: {
      backgroundColor: Colors.mainBackgroundColor,
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    hasCameraPermission: null,
    scanned: false,
    loading: true,
    user: {}
  };

  requestCreateClassData = async (key) => {
    const { user } = this.state;

    console.log(key);

    try {
      await axios({
        method: 'post',
        url: 'https://pacific-bastion-26155.herokuapp.com/session_save',
        data: {
          id: user.id,
          key
        }
      })
      .then(async (response) => {
        console.log(response.data);
        this.setState({ loading: false });
        Alert.alert(
          'Class successfully attended',
          '',
          [
            {text: 'OK', onPress: () => this.props.navigation.goBack()},
          ],
          {cancelable: false},
        );
      })
      .catch((error) => {
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

  async componentDidMount() {
    this.getPermissionsAsync();
    await loadFontAsync();

    const user = JSON.parse(await AsyncStorage.getItem('user'));

    this.setState({ user, loading: false });
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned, loading } = this.state;

    if (loading) {
      return <Loading />;
    } else {
      if (hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      }
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            backgroundColor: Colors.mainBackgroundColor
          }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />

          {scanned && (
            <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
          )}
        </View>
      );
    }
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    const dataList = data.split('TEDFEST-Class-');

    if (dataList.length == 2) {
      this.setState({ loading: true });
      this.requestCreateClassData(dataList[1]);
    } else {
      alert('Invalid QR Code scanned');
    }
  };
}

const styles = StyleSheet.create({
  tintContainer: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#7FFFFFFF'
  }
});
