import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { launchCameraAsync } from "expo-image-picker";

export default function ImagePicker() {
  async function takeImageandler() {
    const image = await launchCameraAsync({
      allowsEditing: true,

      quality: 0.5,
    });
    console.log(image, "iimm");
  }
  return (
    <View>
      <View></View>
      <Button title="Take Image" onPress={takeImageandler} />
    </View>
  );
}

const styles = StyleSheet.create({});
