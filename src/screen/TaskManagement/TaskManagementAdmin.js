import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { RootContainer, AppBar, GeneralButton } from "../../component";
import { COLORS } from "../../assets/theme";
import SurveyOpen from "./TaskPending";
import { SegmentedButtons } from "react-native-paper";

export default function TaskManagementAdmin({ navigation }) {
  const [changeTab, setChangeTab] = useState(false);
  const handlerOpenTab = () => {
    console.log(true);
    setChangeTab(false);
  };
  const [value, setValue] = React.useState("walk");
  const handlerDoneTab = () => {
    setChangeTab(true);
  };

  return (
    <RootContainer isTransparent>
      <View style={styles.container}>
        <AppBar
          title="Task Management"
          onPressNav={() => {
            navigation.navigate("Dashboard");
          }}
        />
        <View style={styles.btnSurveyWrapper}>
          <SegmentedButtons
            value={value}
            checkedColor={"#663"}
            onValueChange={setValue}
            buttons={[
              {
                value: "walk",
                label: "RFP",
              },
              {
                value: "train",
                label: "In Transit",
              },
              { value: "drive", label: "HO Done" },
            ]}
          />
        </View>
        {changeTab ? <SurveyOpen /> : <SurveyOpen />}
      </View>
    </RootContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  btnSurveyWrapper: {
    paddingHorizontal: 20,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignSelf: "stretch",
    paddingVertical: 20,
  },
  openButton: {
    width: "30%",
    borderWidth: 1,
    color: COLORS.PRIMARY_MEDIUM,
    borderColor: COLORS.PRIMARY_MEDIUM,
  },
  doneButtonStyle: {
    width: "30%",
    borderWidth: 1,
    color: COLORS.PRIMARY_MEDIUM,
    borderColor: COLORS.PRIMARY_MEDIUM,
  },
});
