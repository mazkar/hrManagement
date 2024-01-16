import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { ICONS, COLORS, FONTS } from "../../../assets/theme";
import { launchCamera } from "react-native-image-picker";
import { widthPercentageToDP } from "../../../assets/constants/ResponsiveScreen";
import TextError from "../TextError";

const TextInputCamera = ({
  label = "",
  placeholder = "",
  handlerNameChangesValues = "",
  labelError = "",
  namesPhoto = "",
  errorHandler = false,
  resetErrorHandler = () => {},
  onChangeValues,
}) => {
  // console.log('errorHandler =>', errorHandler);
  // console.log('labelError =>', labelError);
  // FUNCTION CAMERA
  const [namePicture, setNamePicture] = useState("");

  const captureImage = () => {
    let option = {
      maxWidth: 720,
      maxHeight: 720,
      quality: 0.3,
      storageOption: {
        path: "images",
        mediaType: "photo",
      },
      includeBase64: true,
    };
    launchCamera(option, (response) => {
      if (response.didCancel) {
        console.log("User Canceled Image Picker");
      } else if (response.errorCode) {
        console.log("Camera Not Avaible");
        Alert.alert("Camera Not Avaible", response.errorCode, [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("Camera Not Avaible") },
        ]);
      } else if (response.errorMessage) {
        Alert.alert("Error Message", response.errorMessage, [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("Camera Not Avaible") },
        ]);
      } else if (response.assets) {
        onChangeValues(response.assets, handlerNameChangesValues);
        resetErrorHandler();
        let fileNamePict;
        response.assets.filter((res) => {
          if (res.fileName) {
            return (fileNamePict = res.fileName);
          }
        });

        setNamePicture(fileNamePict);
      }
    });
  };
  // console.log('namePicture =>', namesPhoto);

  return (
    <React.Fragment>
      <Text style={styles.subTitle}>{label}</Text>
      {errorHandler && <TextError label={labelError} />}
      <TouchableOpacity style={styles.button} onPress={() => captureImage()}>
        <Text
          style={{
            ...styles.placeholder,
            color: namesPhoto === "" ? COLORS.GRAY_MEDIUM : COLORS.BLACK,
          }}
          numberOfLines={1}
        >
          {namesPhoto === ""
            ? placeholder
            : Platform.OS === "ios"
            ? namesPhoto.split("-")[4]
            : namesPhoto.slice(49)}
        </Text>
        {/* <ICONS.IconCamera /> */}
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default TextInputCamera;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    borderColor: COLORS.GRAY_MEDIUM,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeholder: {
    fontSize: FONTS.v15,
    width: widthPercentageToDP("78%"),
  },
  subTitle: {
    fontSize: FONTS.v13,
    fontFamily: "Barlow",
    color: COLORS.DARK,
    fontWeight: "normal",
    marginTop: 10,
    marginBottom: 5,
  },
});
