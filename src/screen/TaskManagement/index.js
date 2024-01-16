import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  RootContainer,
  AppBar,
  GeneralButton,
  ColorBgContainer,
} from "../../component";
import { COLORS } from "../../assets/theme";
import SurveyOpen from "./TaskPending";
import { ms } from "react-native-size-matters";
import { Button, SegmentedButtons } from "react-native-paper";
import API from "../../utils/apiService";
import { useSelector } from "react-redux";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { Tab } from "@rneui/themed";
import { TabView, SceneMap } from "react-native-tab-view";
import { baseUrl } from "../../utils/apiURL";

export default function TaskManagement({ navigation, route }) {
  const [changeTab, setChangeTab] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dataTask, setDataTask] = useState([]);
  const [dataTaskPending, setDataTaskPending] = useState(0);
  const [dataTaskTransit, setDataTaskTransit] = useState(0);
  const [dataTaskHo, setDataTaskHo] = useState(0);
  const [dataPickupDone, setDataPickupDone] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth?.userData?.uid);
  const isFocused = useIsFocused();
  const [index, setIndex] = React.useState(0);
  const [dataPickup, setDataPickup] = useState([]);

  async function getTask(userId) {
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/transportassignment/getPickupPending/${userId}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.data, "meeeeeeeee");
        setDataTask(res.data);
        setDataTaskPending(res.data.length);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function InTransit(userId) {
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/transportassignment/getInTransit/${userId}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.data, "meeeeeeeee");
        setDataTask(res.data);
        console.log(res.data, "transit");
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function pikcup(userId) {
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/transportassignment/getOnSitePickup/${userId}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc

        setDataTask(res.data);
        console.log(res.data, "pickupp");
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function Done(userId) {
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/transportassignment/getAssignmentCompleted/${userId}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.data, "done");
        setDataTask(res.data);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function Done2(userId) {
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/transportassignment/getAssignmentCompleted/${userId}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.data, "done");
        setDataTaskHo(res.data.length);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function InTransitCount(userId) {
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/transportassignment/getInTransit/${userId}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        setDataTaskTransit(res.data.length);
        console.log("count");
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function pikcupCount(userId) {
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/transportassignment/getOnSitePickup/${userId}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        setDataPickupDone(res.data.length);
        // setDataPickup(res.data);
        console.log(res.data.length, "pickupp");
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  const refreshScreen = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getTask(2);
    }, 1500);
  }, []);

  const handlerOpenTab = () => {
    console.log(true);
    setChangeTab(false);
  };
  const [value, setValue] = React.useState("Pending");

  const onChngeTab = async (tab) => {
    console.log(tab);
    setValue(tab);
  };
  const handlerDoneTab = (val) => {
    setIndex(val);
  };

  useEffect(() => {
    if (index == 0) {
      getTask(userId);
    }
    if (index == 1) {
      InTransit(userId);
    }
    if (index == 3) {
      Done(userId);
    }
    if (index == 2) {
      pikcup(userId);
    }
  }, [index, route, isFocused]);

  useEffect(() => {
    InTransitCount(userId);
    Done2(userId);
    pikcupCount(userId);
  }, [isFocused]);

  return (
    <ColorBgContainer>
      <RootContainer isTransparent>
        <AppBar title="Dashboard" />
        <View style={styles.container}>
          <View
            style={{
              height: 82,
              elevation: 1,
              borderColor: Platform.OS === "ios" ? COLORS.GRAY_MEDIUM : null,
            }}
          >
            <Tab
              disableIndicator={true}
              value={index}
              onChange={handlerDoneTab}
              dense
            >
              <Tab.Item
                containerStyle={(active) => ({
                  paddingVertical: 8,
                })}
                titleStyle={(active) => ({
                  color: active ? COLORS.PRIMARY_MEDIUM : "black",
                  fontSize: 11,
                })}
              >
                {`Pending
                (${dataTaskPending})                `}
              </Tab.Item>
              <Tab.Item
                containerStyle={(active) => ({
                  paddingVertical: 8,
                })}
                titleStyle={(active) => ({
                  color: active ? COLORS.PRIMARY_MEDIUM : "black",
                  fontSize: 11,
                })}
              >{`In Transit
              (${dataTaskTransit})              `}</Tab.Item>
              <Tab.Item
                containerStyle={(active) => ({
                  paddingVertical: 8,
                })}
                titleStyle={(active) => ({
                  color: active ? COLORS.PRIMARY_MEDIUM : "black",
                  fontSize: 11,
                })}
              >{`Pickup at Site
              (${dataPickupDone})              `}</Tab.Item>
              <Tab.Item
                containerStyle={(active) => ({
                  paddingVertical: 8,
                  color: "blue",
                })}
                titleStyle={(active) => ({
                  color: active ? COLORS.PRIMARY_MEDIUM : "black",
                  fontSize: 11,
                })}
              >{`HO Done
              (${dataTaskHo})              `}</Tab.Item>
            </Tab>
          </View>

          <View style={styles.btnSurveyWrapper}>
            <View style={{ flexDirection: "column", marginBottom: 32 }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "500",
                  marginBottom: 2,
                }}
              >
                Task Assignment
              </Text>
              <View
                style={{
                  backgroundColor: "black",
                  borderBottomColor: COLORS.PRIMARY_MEDIUM,
                  borderBottomWidth: 4,
                  width: 24,
                }}
              />
            </View>
            {/* <SegmentedButtons
              value={value}
              checkedColor={"#663"}
              onValueChange={onChngeTab}
              buttons={[
                {
                  value: "Pending",
                  label: `Pending`,
                },
                {
                  value: "transit",
                  label: "In Transit",
                },
                { value: "done", label: "HO Done" },
              ]}
            /> */}
          </View>
          <View style={styles.listTask}>
            <SurveyOpen
              listData={dataTask}
              navigation={navigation}
              valueTab={value}
              indexTab={index}
            />
          </View>
        </View>
      </RootContainer>
    </ColorBgContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  btnSurveyWrapper: {
    paddingHorizontal: 18,
    marginTop: 12,
    // paddingVertical: 12,
    // flex: 1,
    // flexDirection: "column",
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
  },
  listTask: {
    paddingHorizontal: 12,
    marginTop: 16,
    // paddingVertical: 12,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
