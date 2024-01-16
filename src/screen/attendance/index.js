import {
  View,
  Text,
  ScrollView,
  Linking,
  RefreshControl,
  StyleSheet,
  Image,
  ImageBackground,
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
  Checkbox,
  Card,
  Modal,
} from "react-native-paper";
import { ms } from "react-native-size-matters";
import {
  AppBar,
  GeneralTextInput,
  OverviewProgres,
  PopUpLoader,
} from "../../component/index";
import { VictoryPie } from "victory-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// iCONS
import FaIcons from "react-native-vector-icons/Ionicons";
import TaskPending from "../../component/section/TaskPending";
import { useDispatch, useSelector } from "react-redux";
import API from "../../utils/apiService";
import axios from "axios";
import { setUser } from "../../store/models/auth/actions";
import { baseUrl } from "../../utils/apiURL";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { BackHandler } from "react-native";
import PhotoTake from "../Dashboard/component/PhotoTake";
import MapComp from "./Component/MapComp";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../assets/constants";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { GeneralButton } from "../../component/index";
import reverseGeocode from "./Component/ReverseGeocode";

export default function Attendance({ navigation, route }) {
  const currentVersion = "1.0.1";
  const [refreshing, setRefreshing] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [notificationToken, setNotificationToken] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const [visibleWarn, setVisibleWarn] = useState(false);
  const [image, setImage] = useState(null);
  const [imagetoShow, setImageToShow] = useState(null);
  const [checked, setChecked] = React.useState(false);
  const [remark, setRemark] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccesMsg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [watermarkImage, setWatermarkImage] = useState(null);
  const [modalSuccesVis, setModalSuccessVis] = useState(false);
  const [modalErroVis, setModalErrorVis] = useState(false);
  const userData = useSelector((state) => state?.auth?.userData);
  const [address, setAddress] = useState("Searching Your Location...");
  const [branchAddress, setBrancjhAddress] = useState(
    "Searching Your Location..."
  );
  const officeCordinate = useSelector((state) => state?.auth?.userData);

  const refreshScreen = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  async function handleClockIn() {
    setIsLoading(true);
    const data = {
      employeeId: userData?.hrEmployeeId,
      photoBase64: "xxysysafaaerefydsfdsfdsyfdsvawwgehjsjxjjsjxjxj",
      LMBY: userData?.uid,
      punchInLongitude: route?.params?.longitude.toString(),
      punchInLatitude: route?.params?.latitude?.toString(),
      punchInDistance: distance.toString,
      workRemotely: checked,
    };
    // console.log(data, "body");
    try {
      // console.log(img._j, "body");
      let res = await axios({
        url: `${baseUrl.URL}api/userrole/userAbsenceCheckIn`,
        method: "post",
        timeout: 8000,
        data: {
          employeeId: userData?.hrEmployeeId,
          photoBase64: image,
          LMBY: userData?.uid,
          punchInLongitude: route?.params?.longitude.toString(),
          punchInLatitude: route?.params?.latitude?.toString(),
          punchInDistance: distance.toString(),
          workRemotely: checked,
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
    navigation.navigate("DashboardAbsence");
    setModalSuccessVis(false);
  };

  const hideModalError = () => {
    setModalErrorVis(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Replace these with the actual latitude and longitude values

      const address = await reverseGeocode(
        route?.params.latitude,
        route?.params?.longitude
      );
      setAddress(address);
    };

    fetchData();
  }, []);

  function haversineDistance(coord1, coord2) {
    const R = 6371000; // Radius of the Earth in meters (1 kilometer = 1000 meters)
    const dLat = deg2rad(coord2[1] - coord1[1]);
    const dLon = deg2rad(coord2[0] - coord1[0]);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(coord1[1])) *
        Math.cos(deg2rad(coord2[1])) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters

    // Round the distance to three decimal places
    return distance.toFixed(3);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const distance = haversineDistance(
    [route?.params.latitude, route?.params?.longitude],
    [
      parseFloat(officeCordinate?.branchLatitude),
      parseFloat(officeCordinate?.branchLongitude),
    ]
  );

  return (
    <ColorBgContainer>
      <RootContainer isTransparent>
        <AppBar title="Dashboard" dataTaskPending={[]} />

        <ImageBackground
          source={require("../../assets/images/BACKGROUND.png")} // Replace with your image URL or local path
          style={styles.backgroundImage}
        >
          <View style={styles.container}>
            <MapComp
              longitude={route?.params?.longitude}
              latitude={route?.params?.latitude}
              branchLongitude={parseFloat(officeCordinate?.branchLongitude)}
              branchLatitude={parseFloat(officeCordinate?.branchLatitude)}
            />
          </View>
          <Card
            style={{
              flex: 1,
              backgroundColor: COLORS.WHITE,
              borderTopRightRadius: ms(12),
              borderTopLeftRadius: ms(12),
              paddingHorizontal: ms(16),
              paddingVertical: ms(16),
              flexDirection: "column",
            }}
          >
            <ScrollView>
              <View>
                <Text style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}>
                  Branch Location Address :
                </Text>
                <Text
                  style={{
                    color: "grey",
                    fontWeight: "300",
                    marginBottom: ms(12),
                  }}
                >
                  {officeCordinate?.branchAddress}
                </Text>
                <Text style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}>
                  Your Location Address :
                </Text>
                <Text
                  style={{
                    color: "grey",
                    fontWeight: "300",
                    marginBottom: ms(12),
                  }}
                >
                  {address}
                </Text>
                <Text style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}>
                  Distance :
                </Text>
                <Text
                  style={{
                    color: "grey",
                    fontWeight: "300",
                    marginBottom: ms(12),
                  }}
                >
                  {`${distance} meters`}
                </Text>
                <Text style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}>
                  Remote :
                </Text>
                <Checkbox.Item
                  label="Remote Work"
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                {/* <Checkbox.Item
              label="Choice 2"
              status={checked ? "unchecked" : "checked"}
              onPress={() => {
                setChecked(!checked);
              }}
            /> */}
              </View>
              {checked ? (
                <View style={{ marginBottom: ms(12) }}>
                  {/* <Text style={styles.text}>Deskripsi</Text> */}
                  <Text
                    style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}
                  >
                    Justification :{" "}
                  </Text>

                  <GeneralTextInput
                    placeholder="Justification"
                    mode="outlined"
                    value={remark}
                    // hasErrors={authFailed}
                    title="Deskripsi"
                    multiline
                    numberOfLines={5}
                    messageError="Wrong Username/Password"
                    onChangeText={(e) => setRemark(e)}
                    style={{ backgroundColor: "white" }}
                  />
                </View>
              ) : (
                <></>
              )}

              <Divider bold />
              <View style={styles.inputForm}>
                {/* <Text style={styles.text}>Upload Gambar</Text> */}
                <PhotoTake
                  image={image}
                  setImage={setImage}
                  imagetoShow={imagetoShow}
                  setImageToShow={setImageToShow}
                  setWatermarkImage={setWatermarkImage}
                  watermarkImage={watermarkImage}
                />
              </View>

              <View style={{ marginBottom: ms(16) }}>
                {imagetoShow && (
                  <Image
                    source={{ uri: imagetoShow }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
              </View>
            </ScrollView>
            <View style={{ alignSelf: "center" }}>
              {officeCordinate?.geofenceAbsenceNeedCheck == "no" ? (
                <TouchableOpacity
                  style={
                    image === null
                      ? styles.clockInButtonDisabled
                      : styles.clockInButton
                  }
                  onPress={() => handleClockIn()}
                  disabled={image === null}
                >
                  <Text style={{ color: COLORS.WHITE }}>CLOCK IN</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <View>
                    <TouchableOpacity
                      style={
                        image === null ||
                        (officeCordinate?.geofenceAbsenceRadius <= distance &&
                          !checked)
                          ? styles.clockInButtonDisabled
                          : styles.clockInButton
                      }
                      onPress={() => handleClockIn()}
                      disabled={
                        image === null ||
                        (officeCordinate?.geofenceAbsenceRadius <= distance &&
                          !checked)
                      }
                    >
                      <Text
                        style={{ color: COLORS.WHITE, alignSelf: "center" }}
                      >
                        CLOCK IN
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    {officeCordinate?.geofenceAbsenceRadius <= distance &&
                    !checked ? (
                      <Text style={{ color: "red" }}>
                        You can't Clock In due to Out of Range of Office
                      </Text>
                    ) : (
                      <></>
                    )}
                  </View>
                </>
              )}
            </View>
          </Card>
        </ImageBackground>
        {/* <Button onPress={() => console.log(address)}>test2</Button> */}

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
    marginTop: ms(16),
    paddingVertical: 12,
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
  container: {
    // flex: 1,
    // backgroundColor: "red",
    // alignItems: "center",
    // justifyContent: "center",
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
  clockInButton: {
    backgroundColor: COLORS.PRIMARY_MEDIUM,
    // alignSelf: "center",
    // justifyContent: "flex-end",
    paddingHorizontal: ms(18),
    paddingVertical: ms(12),
    borderRadius: ms(8),
    marginTop: ms(8),
  },
  clockInButtonDisabled: {
    backgroundColor: "grey",
    // alignSelf: "center",
    // justifyContent: "flex-end",
    paddingHorizontal: ms(18),
    paddingVertical: ms(12),
    borderRadius: ms(8),
    marginTop: ms(8),
  },
});
