import React, { useState } from "react";
import { View, Text, PermissionsAndroid } from 'react-native';

import { BleManager, Device } from "react-native-ble-plx";

const BLEManager = new BleManager();

export default function App() {
  PermissionsAndroid.requestMultiple(
    [
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
    ]
  ).then((answer) => {
    console.log("LOG: scanning");
    BLEManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(JSON.stringify(error));
      }
      if (scannedDevice) {
        BLEManager.stopDeviceScan();
        console.log("Connectoing to device: " + scannedDevice);
        scannedDevice.connect().then((device) => {
          console.log(device.discoverAllServicesAndCharacteristics());
        })
      }
    })
  })

  return (
    <View>
      <Text>Test</Text>
    </View>
  );
}
