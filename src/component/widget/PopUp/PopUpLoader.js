import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import PopUp from ".";
import { COLORS } from "../../../assets/theme";
import LottieView from "lottie-react-native";
import { Image } from "react-native";

const PopUpLoader = (props) => {
  const { visible } = props;
  return (
    <PopUp visible={visible} style={styles.popup}>
      <View style={{ alignItems: "center" }}>
        {/* <ActivityIndicator size="large" color={COLORS.PRIMARY_MEDIUM} /> */}
        <Image
          source={require("../../../assets/images/Floading.gif")}
          style={{ width: 200, height: 200 }}
        />
      </View>
    </PopUp>
  );
};

export default PopUpLoader;

const styles = StyleSheet.create({
  popup: { width: "50%" },
  txtPop: {
    fontSize: 17,
    textAlign: "center",
    // color: "transaparant",
    marginTop: 16,
  },
});
