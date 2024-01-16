import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  ColorBgContainer,
  GeneralButton,
  GeneralTextInput,
  RootContainer,
} from "../../component";
import { useDispatch, useSelector } from "react-redux";
import { resetReducer, setToken } from "../../store/models/auth/actions";
import { COLORS, FONTS } from "../../assets/theme";
import { ms } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Menu, Divider, Avatar, Card } from "react-native-paper";
import { baseUrl } from "../../utils/apiURL";
import axios from "axios";

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("Azka");
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.token);
  const [dataUser, setDataUser] = useState([]);
  const [dataVersion, setDataVersion] = useState([]);
  const handleLogut = () => {
    dispatch(setToken(null));
    navigation.navigate("Login");
  };
  // const handleLogut = () => {
  //   dispatch(resetReducer());
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: "Login" }],
  //   });
  // };

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
        console.log(res.data.data, "user mess");
        setDataUser(res.data.data);
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

  useEffect(() => {
    getData();
    getVersion();
  }, []);

  return (
    <ColorBgContainer style={{ paddingHorizontal: 24, paddingVertical: 72 }}>
      <RootContainer isTransparent>
        <AppBar />

        <ImageBackground
          source={require("../../assets/images/BACKGROUND.png")} // Replace with your image URL or local path
          style={styles.backgroundImage}
        >
          <View style={{ flexDirection: "row", marginBottom: 22 }}>
            <Image
              source={require("../../assets/images/profile.png")}
              style={{ width: 18, height: 24 }}
            />
            <View>
              {/* <Button onPress={() => console.log(user)}>Test</Button> */}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  marginLeft: 12,
                  marginBottom: 2,
                }}
              >
                Profile
              </Text>
              <View
                style={{
                  backgroundColor: "black",
                  borderBottomColor: COLORS.PRIMARY_MEDIUM,
                  borderBottomWidth: 4,
                  width: 24,
                  marginLeft: 12,
                }}
              />
            </View>
          </View>
          <Card
            style={{
              backgroundColor: "#ffff",
              paddingHorizontal: 26,
              paddingVertical: 32,
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                // alignItems: "center",
                flexDirection: "row",
                marginBottom: 12,
                marginTop: 12,
              }}
            >
              <Text style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}>
                EMPLOYEE NAME
              </Text>
              <Text>{user?.name}</Text>
            </View>
            <Divider bold />
            <View
              style={{
                justifyContent: "space-between",
                // alignItems: "center",
                flexDirection: "row",
                marginBottom: 12,
                marginTop: 12,
              }}
            >
              <Text style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}>
                USER LOGIN
              </Text>
              <Text>{dataUser?.userLogin}</Text>
            </View>
            <Divider bold />
            <View
              style={{
                justifyContent: "space-between",
                // alignItems: "center",
                flexDirection: "row",
                marginBottom: 12,
                marginTop: 12,
              }}
            >
              <Text style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}>
                Email
              </Text>
              <Text>{dataUser?.email}</Text>
            </View>
            <Divider bold />
            <View
              style={{
                justifyContent: "space-between",
                // alignItems: "center",
                flexDirection: "row",
                marginBottom: 12,
                marginTop: 12,
              }}
            >
              <Text style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}>
                PHONE NUMBER
              </Text>
              <Text>{dataUser?.phoneNo}</Text>
            </View>
            <Divider bold />
            <View
              style={{
                justifyContent: "space-between",
                // alignItems: "center",
                flexDirection: "row",
                marginBottom: 12,
                marginTop: 12,
              }}
            >
              <Text style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}>
                USER TITLE
              </Text>
              <Text>{user?.userTitle}</Text>
            </View>
            {/* <Button onPress={() => console.log(dataUser)}>test</Button> */}
            <Divider bold />
            {/* <View
              style={{
                justifyContent: "space-between",
                // alignItems: "center",
                flexDirection: "row",
                marginBottom: 12,
                marginTop: 12,
              }}
            >
              <Text style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}>
                EMPLOYEE ID
              </Text>
              <Text>{user?.userID}</Text>
            </View> */}
          </Card>
          <View style={{ marginTop: ms(18) }}>
            <Text style={{ color: "#D2D2D2" }}>
              APP VERSION {dataVersion[0]?.VersionName}
            </Text>
            <GeneralButton
              style={{ backgroundColor: "#F87272", marginTop: ms(18) }}
              mode="contained"
              onPress={() => handleLogut()}
            >
              SIGN OUT
            </GeneralButton>
          </View>
        </ImageBackground>
      </RootContainer>
    </ColorBgContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 72,
    marginTop: ms(32),
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover", // or 'contain' or 'stretch' or 'repeat'
    padding: ms(22),
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
  textTitle: {
    fontWeight: "500",
  },
});
