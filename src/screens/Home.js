import React from 'react'
import { StyleSheet, Text, Button, View } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Button title="Open Qr"
        onPress={() => navigation.navigate('QrScanner')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
