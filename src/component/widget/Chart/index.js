import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { VictoryPie } from "victory-native";
import constants from "../../../assets/constants";
import { COLORS } from "../../../assets/theme";
import { Divider } from "react-native-paper";

const VictoryChart = (props) => {
  const { data, colorbar, surveyOpen, surveyDone, totalSurvey } = props;
  const colorPie = [COLORS.SUCCESS, COLORS.PRIMARY_MEDIUM, COLORS.PRIMARY_DARK];

  const positionTextChartIos = (width) => {
    console.log("width Phone =>", width);
    let left;
    if (width <= 375) {
      console.log("HEllo");
      left = "23.5%";
    } else if (width > 375 && width <= 390) {
      console.log("HEllo 1");
      left = "22.5%";
    } else if (width > 390 && width <= 414) {
      console.log("HEllo 2");
      left = "20.5%";
    } else if (width > 414 && width <= 428) {
      console.log("HEllo 4");
      left = "20%";
    } else {
      console.log("HEllo 3");
      left = "21%";
    }
    return left;
  };
  return (
    <View style={styles.chart}>
      <View style={styles.row}>
        <VictoryPie
          data={data}
          width={290}
          height={290}
          innerRadius={70}
          // colorScale={colorbar}
          colorScale={colorPie}
          labels={() => null} // disable label in chart
        />
        <Divider bold />
      </View>

      <View style={styles.column}>
        <View style={styles.rowKet}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.boxOpen} />
            <Text style={styles.txt1}>Pending({surveyOpen})</Text>
          </View>
          {/* <Text style={styles.txt2}>{surveyOpen}</Text> */}
        </View>
        <View style={styles.rowKet}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.boxDone} />
            <Text style={styles.txt1}>In Transit({totalSurvey})</Text>
          </View>
          {/* <Text style={styles.txt2}>{surveyDone}</Text> */}
        </View>
        <View style={styles.rowKet}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.boxDone1} />
            <Text style={styles.txt1}>HO Done({surveyDone})</Text>
          </View>
          {/* <Text style={styles.txt2}>{surveyDone}</Text> */}
        </View>
      </View>

      {/* <View
        style={{
          ...styles.txtChart,
          left: Platform.OS === "ios" ? positionTextChartIos(constants.WINDOWS_WIDTH) : "22.5%",
        }}
      >
        <View style={[styles.row, { alignItems: "baseline", justifyContent: "center" }]}>
          <Text style={styles.txt3}>{surveyDone}</Text>
        </View>
        <Text style={styles.txt3}>Total</Text>
      </View> */}
    </View>
  );
};

export default VictoryChart;

const styles = StyleSheet.create({
  chart: {
    marginVertical: 20,
    width: 300,

    justifyContent: "center",
    alignItems: "center",
  },
  column: { flexDirection: "row", justifyContent: "center", width: 120 },
  row: { flexDirection: "row" },
  rowKet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    // backgroundColor: "red",
    width: 100,
  },
  boxDone: {
    width: 20,
    height: 20,

    backgroundColor: COLORS.PRIMARY_DARK,
    borderRadius: 4,
    marginRight: 10,
  },
  boxDone1: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.SUCCESS,
    borderRadius: 4,
    marginRight: 10,
  },
  boxOpen: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.PRIMARY_MEDIUM,
    borderRadius: 4,
    marginRight: 10,
  },
  txtChart: {
    position: "absolute",
    top: 75,
    // left: Platform.OS === 'ios' ? '21.5%' : '22.5%',
    left: Platform.OS === "ios" ? "21.5%" : "21.5%",
  },
  txt1: {
    fontSize: 10,
    fontWeight: "400",
    color: COLORS.DARK,
  },
  txt2: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.DARK,
  },
  txt3: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.DARK,
    marginLeft: 8,
  },
});

