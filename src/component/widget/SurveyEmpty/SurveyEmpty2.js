import React from "react";
import { Text, Image, View, StyleSheet, Platform } from "react-native";
import { COLORS, FONTS } from "../../../assets/theme";

const SurveyEmpty2 = ({ label1 = "", label2 = "" }) => {
  const img = {
    dataEmpty: require("../../../assets/images/empty_data.png"),
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={img.dataEmpty} style={styles.ico} />
      </View>
      <Text style={styles.titleError}>{label1}</Text>
      <Text style={styles.subtitleError}>{label2}</Text>
    </View>
  );
};

export default SurveyEmpty2;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  imgContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleError: {
    fontSize: FONTS.v14,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    color: COLORS.GRAY_HARD,
    marginTop: 10,
    textAlign: "center",
  },
  subtitleError: {
    fontSize: FONTS.v13,
    color: COLORS.GRAY_HARD,
    textAlign: "center",
  },
  ico: { width: 65, height: 65, marginRight: 8 },
});
