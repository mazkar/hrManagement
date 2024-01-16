import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ms, moderateScale } from "react-native-size-matters";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { COLORS, FONTS } from "../../../assets/theme";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function PhotoTake({
  image,
  setImage,
  imageToShow,
  setImageToShow,
}) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      bitrateMultiplier: 0.3,
    });

    if (!result.cancelled) {
      setImageToShow(result.uri);
      setImage(result.base64);
    }
  };

  return (
    <View>
      <View>
        <TouchableOpacity style={styles.btnAdd} onPress={takePhoto}>
          {imageToShow == null ? (
            <>
              <FontAwesome
                name="camera"
                size={11}
                style={{
                  fontSize: 16,
                  color: COLORS.WHITE,
                  marginRight: ms(4),
                }}
              />
              <Text style={{ color: "white", fontWeight: "700" }}>
                Ambil Foto
              </Text>
            </>
          ) : (
            <>
              <FontAwesome
                name="camera"
                size={11}
                style={{
                  fontSize: 16,
                  color: COLORS.WHITE,
                  marginRight: ms(4),
                }}
              />
              <Text style={{ color: "white", fontWeight: "700" }}>
                Ambil Ulang Foto
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnAdd: {
    borderRadius: moderateScale(10),
    width: widthPercentageToDP(38),
    height: heightPercentageToDP(6),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY_DARK,
    alignSelf: "flex-start",
    marginBottom: moderateScale(5),
    marginTop: moderateScale(5),
    marginTop: moderateScale(10),
  },
});
