import {
  View,
  Text,
  ScrollView,
  Linking,
  RefreshControl,
  ImageBackground,
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
  Modal,
  Card,
} from "react-native-paper";
import { ms } from "react-native-size-matters";
import {
  AppBar,
  OverviewProgres,
  PopUpLoader,
  GeneralButton,
} from "../../component/index";
import { VictoryPie } from "victory-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// iCONS
import FaIcons from "react-native-vector-icons/Ionicons";
import FaIcons2 from "react-native-vector-icons/FontAwesome5";
import TaskPending from "../../component/section/TaskPending";
import { useDispatch, useSelector } from "react-redux";
import API from "../../utils/apiService";
import axios from "axios";
import { setToken, setUser } from "../../store/models/auth/actions";
import { baseUrl } from "../../utils/apiURL";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import constants from "../../assets/constants";
import { BackHandler } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useUserActivity } from "../../utils/UserActivityContext";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_FETCH_TASK = "background-fetch-task";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  // Your background task logic goes here
  console.log("Background Fetch Task is running!");
  return BackgroundFetch.Result.NewData;
});

export default function DashboardAbsence({ navigation }) {
  const currentVersion = "1.0.1";
  const [refreshing, setRefreshing] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [notificationToken, setNotificationToken] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const [dataTaskPending, setDataTaskPending] = useState([]);
  const [dataChart, setDataChart] = useState({});

  const uid = useSelector((state) => state.auth?.userData?.uid);
  const userData = useSelector((state) => state.auth?.userData);
  const [userId, setUserId] = useState(null);
  const [installationId, setInstallationId] = useState("");
  const userDeviceId = useSelector((state) => state.auth?.userData?.id);
  const isClockIn = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [dataVersion, setDataVersion] = useState([]);
  const [linkDownload, setLinkDownload] = useState([]);
  const [dataSummaryTask, setDatasummaryTask] = useState([]);
  const [visibleWarn, setVisibleWarn] = React.useState(false);
  const [location, setLocation] = useState(null);
  const [dataAbsence, setDataAbsence] = useState([]);
  const [modalSuccesVis, setModalSuccessVis] = useState(false);
  const [modalErroVis, setModalErrorVis] = useState(false);
  const [successMsg, setSuccesMsg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [idleState, setIdleState] = useState(false);

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

  async function getData() {
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/userrole/userAbsenceCheckInStillOpen/${userData?.hrEmployeeId}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc

        console.log(res.data, "datadata");
        setDataAbsence(res.data);
      }

      return res.data;
    } catch (err) {
      console.error(err, "error absence");
    }
  }

  async function handleClockOut() {
    setIsLoading(true);
    const data = {
      employeeId: userData?.hrEmployeeId,

      LMBY: userData?.uid,
      punchId: dataAbsence[0]?.checkInId,
    };
    console.log(data, "body");
    try {
      // console.log(img._j, "body");
      let res = await axios({
        url: `${baseUrl.URL}api/userrole/userAbsenceCheckOut`,
        method: "post",
        timeout: 8000,
        data: {
          employeeId: userData?.hrEmployeeId,

          LMBY: userData?.uid,
          punchId: dataAbsence[0]?.checkInId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status == 200) {
        // test for status you want, etc
        setIsLoading(false);
        setModalSuccessVis(true);
        console.log(res.data, "res absen");
        setSuccesMsg(res.data.message);
        // setDataItem(res.data);
        // setDataInfo(res.data);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      setModalErrorVis(true);
      setErrorMessage(err.message);
    }
  }

  const hideModalSuccess = () => {
    getData();
    setModalSuccessVis(false);
  };

  const hideModalError = () => {
    setModalErrorVis(false);
  };

  const handleOk = () => {
    setVisibleWarn(false);
    handleClockOut();
  };

  const refreshScreen = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    // getData();
    getItemFromAsyncStorage();
  }, [refreshing, installationId]);

  useEffect(() => {
    setUserId(uid);
  }, [setUser]);

  useEffect(() => {
    getData();
    // getItemFromAsyncStorage();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log("denied");
        setIsLoading(false);
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location, "current");
      setIsLoading(false);
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log("Screen is focused");
      getData();
    }, [])
  );

  const { lastActivity, updateLastActivity } = useUserActivity();

  useEffect(() => {
    const checkIdleTimeout = () => {
      const idleTimeout = 10 * 60 * 1000; // 30 seconds in milliseconds

      if (lastActivity && new Date().getTime() - lastActivity > idleTimeout) {
        // Log out the user or navigate to the logout screen
        // For simplicity, let's navigate to the logout screen
        // navigation.navigate("History");
        setIdleState(true);
      }
    };

    const activityInterval = setInterval(checkIdleTimeout, 1000);

    // Set up background fetch
    BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 30, // Minimum interval in minutes (30 minutes in this example)
      stopOnTerminate: false, // Continue running background fetch even if the app is terminated
      startOnBoot: true, // Start background fetch on device boot
    });

    return () => {
      clearInterval(activityInterval);
      BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    };
  }, [lastActivity, navigation]);

  // const handleLogOut = () => {
  //   setIdleState(false);
  //   updateLastActivity();
  // };

  const handleLogOut = () => {
    dispatch(setToken(null));
    navigation.navigate("Login");
    setIdleState(false);
    updateLastActivity();
  };
  return (
    <ColorBgContainer>
      <RootContainer isTransparent>
        <AppBar title="Dashboard" dataTaskPending={dataTaskPending} />
        <TouchableOpacity onPress={() => updateLastActivity()}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            onPr
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshScreen}
                colors={[COLORS.PRIMARY_MEDIUM]}
                tintColor={COLORS.PRIMARY_MEDIUM}
              />
            }
          >
            <ImageBackground
              source={require("../../assets/images/BACKGROUND.png")} // Replace with your image URL or local path
              style={styles.backgroundImage}
            >
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

                {dataAbsence?.length === 0 ? (
                  <Card
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      // justifyContent: "center",
                      // flex: 1,
                      // alignItems: "center",
                      paddingVertical: ms(18),
                      elevation: 2,
                    }}
                  >
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      <View>
                        <FaIcons2
                          name="calendar-alt"
                          style={{ fontSize: 20, color: COLORS.PRIMARY_DARK }}
                        />
                      </View>
                      <View style={{ marginLeft: ms(6) }}>
                        <Text style={{ color: COLORS.PRIMARY_DARK }}>
                          {moment().format("DD MMMM YYYY")}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{ marginTop: ms(18), paddingHorizontal: ms(18) }}
                    >
                      <Divider bold />
                    </View>
                    <View style={{ alignSelf: "center" }}>
                      <Text style={{ color: "gray" }}>
                        You can Clock in Now
                      </Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: COLORS.PRIMARY_MEDIUM,
                          alignSelf: "center",
                          paddingHorizontal: ms(18),
                          paddingVertical: ms(12),
                          borderRadius: ms(8),
                          marginTop: ms(8),
                        }}
                        onPress={() =>
                          navigation.navigate("Attendance", {
                            longitude: location?.coords?.longitude,
                            latitude: location?.coords?.latitude,
                          })
                        }
                      >
                        <Text style={{ color: COLORS.WHITE }}>CLOCK IN</Text>
                      </TouchableOpacity>
                    </View>

                    {/* victory chart */}
                  </Card>
                ) : (
                  <Card
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      // justifyContent: "center",
                      // flex: 1,
                      // alignItems: "center",
                      paddingVertical: ms(18),
                      elevation: 2,
                    }}
                  >
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      <View>
                        <FaIcons2
                          name="calendar-alt"
                          style={{ fontSize: 20, color: COLORS.PRIMARY_DARK }}
                        />
                      </View>
                      <View style={{ marginLeft: ms(6) }}>
                        <Text style={{ color: COLORS.PRIMARY_DARK }}>
                          {moment().format("DD MMMM YYYY")}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{ marginTop: ms(18), paddingHorizontal: ms(18) }}
                    >
                      <Divider bold />
                    </View>
                    <View style={{ alignSelf: "center" }}>
                      <View>
                        <Text style={{ color: "gray" }}>
                          You Have Clocked In
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        //   backgroundColor: "red",
                        justifyContent: "space-between",
                        paddingHorizontal: ms(22),
                        marginTop: ms(12),
                      }}
                    >
                      <View>
                        <Text style={{ fontWeight: "600" }}>
                          {" "}
                          Clock In Time
                        </Text>
                        <Text style={{ alignSelf: "center", fontSize: ms(10) }}>
                          {moment(dataAbsence[0]?.checkInDate).format(
                            "DD/MM/YYYY hh:mm"
                          )}
                        </Text>
                      </View>
                      <View>
                        <Text style={{ fontWeight: "600" }}>
                          {" "}
                          Clock Out Time
                        </Text>
                        {dataAbsence[0]?.checkOutDate == null ? (
                          <Text style={{ alignSelf: "center" }}>- - -</Text>
                        ) : (
                          <Text
                            style={{ alignSelf: "center", fontSize: ms(10) }}
                          >
                            {moment(dataAbsence[0]?.checkOutDate).format(
                              "DD/MM/YYYY hh:mm:ss"
                            )}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View
                      style={{ marginTop: ms(18), paddingHorizontal: ms(18) }}
                    >
                      <Divider bold />
                    </View>

                    <View style={{ marginTop: ms(18) }}>
                      {dataAbsence[0]?.checkOutStatus == "closed" ? (
                        <TouchableOpacity
                          style={{
                            backgroundColor: COLORS.SUCCESS,
                            alignSelf: "center",
                            paddingHorizontal: ms(18),
                            paddingVertical: ms(12),
                            borderRadius: ms(8),
                            marginTop: ms(8),
                          }}
                          disabled
                          onPress={() => setVisibleWarn(true)}
                        >
                          <Text style={{ color: COLORS.WHITE }}>
                            You Are Already Clock Out Today
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{
                            backgroundColor: COLORS.PRIMARY_DARK,
                            alignSelf: "center",
                            paddingHorizontal: ms(18),
                            paddingVertical: ms(12),
                            borderRadius: ms(8),
                            marginTop: ms(8),
                          }}
                          // onPress={() => setVisibleWarn(true)}
                          onPress={() =>
                            navigation.navigate("ClockOut", {
                              longitude: location?.coords?.longitude,
                              latitude: location?.coords?.latitude,
                              punchId: dataAbsence[0]?.checkInId,
                            })
                          }
                        >
                          <Text style={{ color: COLORS.WHITE }}>CLOCK OUT</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </Card>
                )}
              </View>
            </ImageBackground>
          </ScrollView>
        </TouchableOpacity>

        <PopUpLoader visible={isLoading} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalSuccesVis}
          onRequestClose={hideModalSuccess}
        >
          {/* <View style={styles.centeredView}> */}
          <View style={styles.containermodalView}>
            <View style={styles.imgSubmit}>
              <Ionicons
                name="checkmark-circle"
                size={24}
                style={{ fontSize: 72, color: COLORS.SUCCESS }}
              />
            </View>
            <Text style={styles.modalText}>{successMsg}</Text>
            <GeneralButton
              style={{ backgroundColor: COLORS.PRIMARY_DARK }}
              mode="contained"
              onPress={hideModalSuccess}
            >
              Close
            </GeneralButton>
          </View>
          {/* </View> */}
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalErroVis}
          onRequestClose={hideModalError}
        >
          {/* <View style={styles.centeredView}> */}
          <View style={styles.containermodalView}>
            <View style={styles.imgSubmit}>
              <FontAwesome
                name="close"
                size={24}
                style={{ fontSize: 72, color: COLORS.RED_BG }}
              />
            </View>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <GeneralButton
              style={{ backgroundColor: COLORS.PRIMARY_MEDIUM }}
              mode="contained"
              onPress={hideModalError}
            >
              Close
            </GeneralButton>
          </View>
          {/* </View> */}
        </Modal>
        <Portal>
          <Dialog visible={visibleWarn}>
            <Dialog.Icon icon={<FaIcons name="location-arrow" />} />
            {/* <Dialog.Title>Alert</Dialog.Title> */}
            <Dialog.Content>
              <Text variant="bodyMedium">Are you sure want to Clock Out</Text>
            </Dialog.Content>
            <Dialog.Actions>
              {/* <Button onPress={() => setVisible(false)}>Cancel</Button> */}
              <Button onPress={() => setVisibleWarn(false)}>Cancel</Button>
              <Button onPress={handleOk}>Confirm</Button>
              {/* <Button onPress={() => setVisibleWarn(false)}>Done</Button> */}
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog visible={idleState} style={{ backgroundColor: "white" }}>
            <Dialog.Icon icon={<FaIcons name="location-arrow" />} />
            {/* <Dialog.Title>Alert</Dialog.Title> */}
            <Dialog.Content>
              <Text variant="bodyMedium">
                User logged out due to inactivity for 10 minutes
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              {/* <Button onPress={() => setVisible(false)}>Cancel</Button> */}
              {/* <Button onPress={() => setVisibleWarn(false)}>Cancel</Button> */}
              <Button onPress={() => handleLogOut()}>OK</Button>
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
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover", // or 'contain' or 'stretch' or 'repeat'
    // padding: ms(22),
    // justifyContent: "center",
    // alignItems: "center",
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
  containermodalView: {
    flexDirection: "column",
    alignSelf: "center",
    // position: "absolute",
    width: constants.SCREEN_WIDTH * 0.8,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 28,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
  },
  modalText: {
    paddingTop: 20,
    marginBottom: 28,
    textAlign: "center",
    alignSelf: "center",
    fontSize: 17,
    letterSpacing: 1,
    lineHeight: 24,
    width: constants.SCREEN_WIDTH * 0.7,
    fontWeight: "600",
  },
  imgSubmit: {
    alignItems: "center",
    justifyContent: "center",
  },
});
