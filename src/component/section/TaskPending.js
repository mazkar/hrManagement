import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styles from "../../screen/Dashboard/styles";
import { ICONS } from "../../assets/theme";
import { Chart } from "..";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MapTracker from "../widget/MapTracker";
import { WebView } from "react-native-webview";
import MapTracker2 from "../widget/MapTracker/MapTracker2";

const TaskPending = (props) => {
  const { valueOpen, valueDone, valueTotal, surveyChart = [] } = props;
  const survey = [
    {
      name: "Done",
      y: 1,
    },
    {
      name: "Open",
      y: 2,
    },
  ];
  console.log("data chart =>", surveyChart);

  const navigateToTracking = (stat) => {
    if (stat == 1) {
      props.navigation.navigate("Tracker");
    } else {
      props.navigation.navigate("Tracker2");
    }
  };

  return (
    <ScrollView horizontal style={styles.surveyProgres}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigateToTracking(1)}
      >
        <View style={styles.cardHeader}>
          <View style={styles.titleContiner}>
            <Text style={styles.txtTitle}>Delivery Tracking PO-223</Text>
          </View>
        </View>
        <MapTracker />
        {/* victory chart */}
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.card}
        onPress={() => navigateToTracking(2)}
      >
        <View style={styles.cardHeader}>
          <View style={styles.titleContiner}>
            <Text style={styles.txtTitle}>Delivery Tracking PO-100</Text>
          </View>
        </View>
        <MapTracker2 />
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default TaskPending;
