import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import {
  ItemSurveyOpen,
  PopUpLoader,
  RefreshScreen,
  SurveyEmpty2,
} from "../../component/index.js";
import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-paper";
import { COLORS } from "../../assets/theme/index.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SurveyOpen = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // AsyncStorage.multiGet(["key", "assignmentId"])

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("assignmentId");
      if (data !== null) {
        console.log("Data retrieved successfully:", data);
      } else {
        console.log("No data found.");
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <PopUpLoader visible={true} />}

      {errorMessage.message === "Request failed with status code 500" ? (
        <></>
      ) : !isLoading && !!errorMessage ? (
        <RefreshScreen style={styles.refresh} />
      ) : (
        <>
          {/* <Button onPress={() => getData()}>Tets</Button> */}
          {props.indexTab == 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listData} // center emptyData component
              // data={surveyOpen}
              data={props.listData}
              keyExtractor={(item) => item.assignmentId}
              renderItem={({ item, index }) => (
                <ItemSurveyOpen
                  style={styles.itemSurveyOpen}
                  index={index + 1}
                  indexTab={props.indexTab}
                  transportAssignmentRefId={
                    item.transportAssignmentRefId !== null
                      ? item.transportAssignmentRefId
                      : "-"
                  }
                  totalOrderReq={
                    item.totalOrderReq !== null ? item.totalOrderReq : "-"
                  }
                  isPickup={item.isPickup}
                  assignedBy={item.assignedBy !== null ? item.assignedBy : "-"}
                  assigneDate={
                    item.assigneDate !== null
                      ? moment(item.assigneDate).format("DD MMM YYYY")
                      : "--/--/----"
                  }
                  onPress={() => {
                    // dispatch(surveyTimeAction.setSurveyTime(new Date().getTime()));
                    // navigationSurvey(item);
                    props.navigation.navigate(
                      props.indexTab == 0
                        ? "DetailTaskPending"
                        : props.indexTab == 1
                        ? "DetailOnSite"
                        : props.indexTab == 2
                        ? "DetailOnSite"
                        : "DetailTaskDone",
                      {
                        transportArrangementId: item.transportArrangementId,
                        assignmentId: item.assignmentId,
                        isPickup: item?.isPickup,
                        navigation: props.navigation,
                        totalOnsite: item.totalOnsite,
                        totalOrderRequest: item.totalOrderRequest,
                      }
                    );
                  }}
                />
              )}
              ListEmptyComponent={
                <SurveyEmpty2 label1="Anda Belum Memiliki Task Tersedia" />
              }
            />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listData} // center emptyData component
              // data={surveyOpen}
              data={props.listData}
              keyExtractor={(item) => item.assignmentId}
              renderItem={({ item, index }) => (
                <ItemSurveyOpen
                  style={styles.itemSurveyOpen}
                  indexTab={props.indexTab}
                  index={index + 1}
                  isPickup={item.isPickup}
                  // hasGroup={item.hasGroup}
                  transportAssignmentRefId={
                    item.transportAssignmentRefId !== null
                      ? item.transportAssignmentRefId
                      : "-"
                  }
                  totalOrderReq={
                    item.totalOrderReq !== null ? item.totalOrderRequest : "-"
                  }
                  assignedBy={item.assignedBy !== null ? item.assignedBy : "-"}
                  totalOnSite={
                    item.totalOnsite !== null ? item.totalOnsite : "-"
                  }
                  assigneDate={
                    item.assigneDate !== null
                      ? moment(item.assigneDate).format("DD MMM YYYY")
                      : "--/--/----"
                  }
                  onPress={() => {
                    console.log(props.indexTab, "index tab");
                    // dispatch(surveyTimeAction.setSurveyTime(new Date().getTime()));
                    // navigationSurvey(item);
                    props.navigation.navigate(
                      props.indexTab == 0
                        ? "DetailTaskPending"
                        : props.indexTab == 1
                        ? "DetailOnSite"
                        : props.indexTab == 2
                        ? "DetailOnSite"
                        : "DetailTaskDone",
                      {
                        transportArrangementId: item.transportArrangementId,
                        assignmentId: item.assignmentId,
                        isPickup: item?.isPickup,
                        hasGroup: item.hasGroup,
                        navigation: props.navigation,
                        totalOnsite: item.totalOnsite,
                        totalOrderRequest: item.totalOrderRequest,
                      }
                    );
                  }}
                />
              )}
              ListEmptyComponent={
                <SurveyEmpty2 label1="Anda Belum Memiliki Task Tersedia" />
              }
            />
          )}
        </>
      )}
    </View>
  );
};

export default SurveyOpen;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, flex: 1, width: "100%" },
  itemSurveyOpen: { marginBottom: 20 },
  listData: { flexGrow: 1 },
  surveyEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    backgroundColor: "black",
  },
});
