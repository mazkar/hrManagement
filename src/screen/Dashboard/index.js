import {
  View,
  Text,
  ScrollView,
  Linking,
  RefreshControl,
  StyleSheet,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import RootContainer from "../../component/RootContainer/index";
import { useNavigation } from "@react-navigation/core";
import ColorBgContainer from "../../component/ColorBgContainer";
import { COLORS, FONTS } from "../../assets/theme";
import {
  Button,
  Menu,
  Divider,
  Dialog,
  Portal,
  Card,
} from "react-native-paper";
import { ms } from "react-native-size-matters";
import { AppBar, OverviewProgres } from "../../component/index";
import { VictoryPie } from "victory-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// iCONS
import FaIcons from "react-native-vector-icons/Ionicons";
import FaIcons2 from "react-native-vector-icons/FontAwesome5";
import TaskPending from "../../component/section/TaskPending";
import { useDispatch, useSelector } from "react-redux";
import API from "../../utils/apiService";
import axios from "axios";
import { setUser } from "../../store/models/auth/actions";
import { baseUrl } from "../../utils/apiURL";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import { BackHandler } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

export default function Dashboard({ navigation }) {
  const currentVersion = "1.0.1";
  const [refreshing, setRefreshing] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [notificationToken, setNotificationToken] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const [dataTaskPending, setDataTaskPending] = useState([]);
  const [dataChart, setDataChart] = useState({});

  const uid = useSelector((state) => state.auth?.userData?.uid);
  const [userId, setUserId] = useState(null);
  const [installationId, setInstallationId] = useState("");
  const userDeviceId = useSelector((state) => state.auth?.userData?.id);
  const isClockIn = useSelector((state) => state.auth.isClockIn);
  const [isLoading, setIsLoading] = useState(false);
  const [dataVersion, setDataVersion] = useState([]);
  const [linkDownload, setLinkDownload] = useState([]);
  const [dataSummaryTask, setDatasummaryTask] = useState([]);
  const [visibleWarn, setVisibleWarn] = React.useState(false);

  const requestNotificationPermission = async () => {
    const { granted } = await Notifications.requestPermissionsAsync();
    if (granted) {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setNotificationToken(token);
    } else {
      console.log("Notification permissions denied");
    }
  };
  async function getItemFromAsyncStorage(key) {
    try {
      const value = await AsyncStorage.getItem("installationId");
      if (value !== null) {
        // Data found in AsyncStorage for the given key
        console.log("Value:", value);
        setInstallationId(value);
      } else {
        // No data found for the given key
        console.log("Value not found.");
        return null;
      }
    } catch (error) {
      // Error retrieving data
      console.error("Error while fetching data:", error);
      return null;
    }
  }

  async function getSummaryTask(userId) {
    setIsLoading(true);
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/transportassignment/transportAssignmentMobileDashboard/${userId}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.data, "data summary");
        setDatasummaryTask(res.data);
        setIsLoading(false);
        setDataChart([
          {
            name: "Done",
            y: res.data[0]?.totalHODoneCount,
          },
          {
            name: "Open",
            y: res.data[0]?.totalPendingCount,
          },
          {
            name: "Transit",
            y: res.data[0]?.totalInTransitCount,
          },
        ]);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err, "error");
      setIsLoading(false);
    }
  }

  async function getData() {
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/auth/me`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.data.data, deviceId, "user mess");
        // dispatch(setUser(res.data.data));
        // updateToken(res.data.data.deviceID, installationId);
        // getSummaryTask(res.data.data.userId);
        // getTask(res.data.data.userId);

        // InTransit(res.data.data.userId);

        // Done(res.data.data.userId);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err, "error me");
    }
  }

  async function getVersion() {
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/MobileApps/getMobileAppsVersion`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.data[0], "version");
        // dispatch(setUser(res.data.data));
        setDataVersion(res.data);
        if (res.data[0]?.VersionName != currentVersion) {
          setVisibleWarn(true);
        }
        // getSummaryTask(res.data.data.userId);
        // getTask(res.data.data.userId);

        // InTransit(res.data.data.userId);

        // Done(res.data.data.userId);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err, "error version");
    }
  }

  async function getLinkDownload() {
    try {
      let res = await axios({
        url: `${baseUrl.URL}getMobileAppsVersion`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.data[0], "version");
        // dispatch(setUser(res.data.data));
        setLinkDownload(res.data);
        // if (res.data[0]?.VersionName != currentVersion) {
        //   setVisibleWarn(true);
        // }
        // getSummaryTask(res.data.data.userId);
        // getTask(res.data.data.userId);

        // InTransit(res.data.data.userId);

        // Done(res.data.data.userId);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err, "error version");
    }
  }

  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  async function updateToken(userDeviceId, installationId) {
    console.log(userDeviceId, "<==dev id");
    console.log(installationId, "<==ins id");
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/userrole/updateInstallationId/${userDeviceId}/${installationId}`,
        method: "put",
        timeout: 8000,
        data: "",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res, "update token");

        // startLocationUpdates();
        // setDataItem(res.data);
        // setDataInfo(res.data);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err, "error update token");
    }
  }

  const handleDownload = async () => {
    const url = dataVersion[0].urlApp;

    // Open the link using Linking
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("Don't know how to open URI: " + url);
    }
  };

  const refreshScreen = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getSummaryTask(uid);
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    // getData();
    getItemFromAsyncStorage();
  }, [refreshing, installationId]);

  useEffect(() => {
    getSummaryTask(uid);
  }, [TaskPending, installationId, userId]);

  useEffect(() => {
    setUserId(uid);
  }, [setUser]);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    updateToken(userDeviceId, installationId);
  }, [installationId]);

  useEffect(() => {
    getVersion();
    getLinkDownload();
  }, []);

  return (
    <ColorBgContainer>
      <RootContainer isTransparent>
        <AppBar title="Dashboard" dataTaskPending={dataTaskPending} />
        {/* <Button
          onPress={() => console.log(isClockIn.isClockIn, "clock in res")}
        >
          test
        </Button> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshScreen}
              colors={[COLORS.PRIMARY_MEDIUM]}
              tintColor={COLORS.PRIMARY_MEDIUM}
            />
          }
        >
          <View style={styles.mainContainer}>
            <View style={styles.overviewContainer}>
              <View style={{ flexDirection: "column", marginBottom: 32 }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "500",
                    marginBottom: 2,
                  }}
                >
                  Dashboard
                </Text>
                {/* <Button onPress={() => console.log(dataVersion[0])}>
                  test
                </Button> */}
                <View
                  style={{
                    backgroundColor: "black",
                    borderBottomColor: COLORS.PRIMARY_MEDIUM,
                    borderBottomWidth: 4,
                    width: 24,
                  }}
                />
              </View>

              {/* <Button onPress={() => console.log(dataTaskDone, dataTaskInTransit, dataTaskPending)}>
        Test
      </Button> */}

              <OverviewProgres
                dataChart={dataChart}
                dataTaskInTransit={dataSummaryTask[0]?.totalInTransitCount}
                dataTaskPending={dataSummaryTask[0]?.totalPendingCount}
                dataTaskDone={dataSummaryTask[0]?.totalHODoneCount}
              />

              {/* <TaskPending navigation={navigation} /> */}
              {/* <View>
                <Text style={styles.profileName}>Overview</Text>
              </View> */}
            </View>

            {/* <View style={styles.profileSection}>
              <Text style={styles.profileName}>Mohamad Azka Rijalfaris</Text>
            </View> */}
          </View>
        </ScrollView>
        <Portal>
          <Dialog visible={visibleWarn}>
            <Dialog.Icon icon={<FaIcons name="location-arrow" />} />
            {/* <Dialog.Title>Alert</Dialog.Title> */}
            <Dialog.Content>
              <Text variant="bodyMedium">
                FAMS Mobile App New Version {dataVersion[0]?.VersionName}{" "}
                Available To Continue, Please Download and Update Apps.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              {/* <Button onPress={() => setVisible(false)}>Cancel</Button> */}
              <Button onPress={handleBackButton}>Exit Apps</Button>
              <Button onPress={handleDownload}>Download</Button>
              {/* <Button onPress={() => setVisibleWarn(false)}>Done</Button> */}
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </RootContainer>
    </ColorBgContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  profileSection: {
    paddingVertical: 22,
    paddingHorizontal: 18,
    flex: 1,
    justifyContent: "center",
    // backgroundColor: 'red',
    alignItems: "center",
  },
  profileName: {
    fontSize: FONTS.v20,
    fontWeight: "500",
    // fontFamily: 'barlow',
    color: COLORS.BLACK,
  },
  notif: {
    // paddingVertical: 4,
    paddingHorizontal: 18,
    marginTop: ms(16),
    paddingVertical: 12,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: 'red',
    // alignItems: 'flex-end',
  },
  helloContainer: {
    // paddingVertical: 4,
    paddingHorizontal: 18,
    // marginTop: ms(16),
    paddingVertical: 12,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
    // alignItems: 'flex-end',
  },
  overviewContainer: {
    // paddingVertical: 4,
    paddingHorizontal: 18,
    // marginTop: ms(16),
    paddingVertical: 2,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // backgroundColor: 'red',
    // alignItems: 'flex-end',
  },
  overviewText: {
    fontSize: FONTS.v15,
    fontWeight: "400",
    // fontFamily: 'barlow',
    color: COLORS.GRAY_HARD,
  },
  card: {
    paddingHorizontal: 8,
    paddingVertical: 20,
    marginHorizontal: 12,
    borderRadius: 8,
    height: 426,
    elevation: 2,
    backgroundColor: COLORS.WHITE,
  },
  cardHeader: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContiner: {
    alignItems: "center",
    flexDirection: "row",
  },
  titleContiner: {
    alignItems: "center",
    flexDirection: "row",
  },
  txtTitle: {
    fontSize: FONTS.v18,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    color: COLORS.DARK,
    marginLeft: 5,
  },
});
