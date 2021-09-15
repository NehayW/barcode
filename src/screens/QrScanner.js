import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Ionicons} from '@expo/vector-icons';
import focusImg from '../../assets/images/camera-focus.png';
import scanImg from '../../assets/images/focus-icon.png'
const {width, height} = Dimensions.get('window');
import * as Animatable from 'react-native-animatable';
import { Camera } from 'expo-camera';

export default function QrScanner({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] =useState(Camera.Constants.FlashMode.off);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const toggleFlash = () => {
    if (flash==Camera.Constants.FlashMode.off) {
      setFlash(Camera.Constants.FlashMode.torch)
    } else {
      setFlash(Camera.Constants.FlashMode.off)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
          <Animatable.Image animation="pulse" easing="ease-out" iterationCount="infinite"
            source={focusImg} style={styles.focusImg} />
      </View>
      <Camera style={styles.barCodeScanner} 
      barCodeScannerSettings={{
        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
      }}
      flashMode={flash}
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      type={Camera.Constants.Type.back}>
      </Camera>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleFlash}>
          <Ionicons name="flashlight" size={35} color={flash==Camera.Constants.FlashMode.off?'white':'lightblue'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={35} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  barCodeScanner: {
    // flex: 1,
    width,
    height,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 1,
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  imgContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  focusImg: {
    width: width/1.4,
    height: width/1.4,
    tintColor: '#fff'
  },
});
