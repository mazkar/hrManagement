import {
  View,
  Text,
  // ScrollView,
  // RefreshControl,
  StyleSheet,
  SafeAreaView,
  Platform,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import React, { useState, useEffect } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import useNavigation from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";

import { COLORS, FONTS } from "../../assets/theme";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider, Checkbox } from "react-native-paper";
import constants from "../../assets/constants";
import { URL } from "../../utils/apiURL";
import {
  GeneralButton,
  GeneralTextInput,
  TextInputPassword,
  PopUpLoader,
} from "./../../component/index";
import * as AuthService from "../../services/authServices";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setClockInStat } from "../../store/models/auth/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../../utils/apiURL";
import axios from "axios";
import { setUser } from "../../store/models/auth/actions";
import jwtDecode from "jwt-decode";
import { setuserNamePassword } from "../../store/models/Global/action";
import { useUserActivity } from "../../utils/UserActivityContext";
import * as SecureStore from "expo-secure-store";

const LoginPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const { lastActivity, updateLastActivity } = useUserActivity();

  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [handlerChangeLanguage, setHandlerChangeLanguage] = useState(0);
  const [authLoading, setAuthLoading] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);
  const [deviceId, setDeviceId] = useState(null);

  // FORM
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isClockIn, setIsClockIn] = React.useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const saveCredentials = async () => {
    try {
      await SecureStore.setItemAsync("username", username);
      await SecureStore.setItemAsync("password", password);
      console.log("Credentials saved successfully!");
    } catch (error) {
      console.error("Error saving credentials:", error);
    }
  };

  const handleCheckboxToggle = () => {
    setIsClockIn(!isClockIn);
  };

  const refreshScreen = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const storeToken = (data) => {
    // Process the received locations as needed
    AsyncStorage.setItem("key", data)
      .then(() => {
        console.log("Data stored successfully");
      })
      .catch((error) => {
        console.error("Error storing data:", error);
      });
  };

  async function getItemFromAsyncStorage(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // Data found in AsyncStorage for the given key
        console.log("Value:", value);
        return value;
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
  // Hanlde Login

  async function getData(token) {
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
        console.log(res.data.data, "user me");
        dispatch(setUser(res.data.data));
      }

      return res.data;
    } catch (err) {
      console.error(err, "error me");
    }
  }

  const decode = (token) => {
    try {
      const decodeToken = jwtDecode(token);
      console.log(decodeToken, "success decode");
      dispatch(setUser(decodeToken));
      console.log(decodeToken, "decoded");
    } catch (error) {
      console.log(error.messagec, "set decode error");
    }
  };

  const handleLogin = async () => {
    // console.log(isClockIn);
    try {
      setAuthLoading(true);
      const token = await AuthService.LoginAPI(username, password, deviceId); //await AuthService.loginByAuth(email, password);
      dispatch(setToken(token));

      storeToken(token);
      decode(token);
      dispatch(setClockInStat(isClockIn));
      // console.log(token);
      setTimeout(() => {
        setAuthLoading(false);
        navigation.push("Main");
      }, 2000);
    } catch (error) {
      // console.log(error.message, "ini error");
      setAuthFailed(true);

      setAuthLoading(false);
    }
  };

  const handleLoginClockIn = async () => {
    // console.log(isClockIn);

    try {
      setAuthLoading(true);
      const token = await AuthService.LoginAPIClockIn(
        username,
        password,
        deviceId
      ); //await AuthService.loginByAuth(email, password);
      dispatch(setToken(token));

      storeToken(token);
      decode(token);
      updateLastActivity();
      dispatch(setClockInStat(true));
      saveCredentials();
      // console.log(token);
      setTimeout(() => {
        setAuthLoading(false);
        navigation.push("Main");
      }, 2000);
    } catch (error) {
      // console.log(error.message, "ini error");
      setAuthFailed(true);

      setAuthLoading(false);
    }
  };

  // IOS
  const headerFlexContainerIos = (height) => {
    console.log("INI HEIGHT", height);
    if (height >= 926) {
      console.log("HEADER 986");
      return 1.3;
    } else if (height < 926 && height >= 896) {
      console.log("HEADER 926 && 896");
      return 1.2;
    } else if (height < 926 && height >= 844) {
      console.log("HEADER 986 && 844");
      return 1.1;
    } else if (height >= 736 && height >= 812) {
      console.log("HEADER 844 && 812");
      return 1;
    } else if (height < 812 && height >= 736) {
      console.log("height < 812 && height >= 736");
      return 0.9;
    } else {
      console.log("ELSE HEADER");
      return 0.8;
    }
  };

  const footerFlexContainerIos = (height) => {
    console.log("INI HEIGHT", height);
    if (height >= 896) {
      return 1.3;
    } else if (height < 926 && height >= 844) {
      return 1.2;
    } else if (height < 844 && height >= 812) {
      return 1.1;
    } else if (height < 812 && height >= 736) {
      return 1;
    } else {
      return 0.8;
    }
  };

  // ANDROID
  const headerFlexContainerAndroid = (height) => {
    if (height <= 732) {
      return 0.85;
    } else {
      return 0.9;
    }
  };

  const footerFlexContainerAndroid = (height) => {
    if (height <= 732) {
      return 0.725;
    } else {
      return 1;
    }
  };

  const handlerIndonesiaText = () => {
    setHandlerChangeLanguage(0);
  };

  const handlerEnglishText = () => {
    setHandlerChangeLanguage(1);
  };

  useEffect(() => {
    const keyToRetrieve = "installationId";
    getItemFromAsyncStorage(keyToRetrieve)
      .then((value) => {
        // Use the retrieved value here
        setDeviceId(value);
        console.log("Retrieved value:", value);
      })
      .catch((error) => {
        // Handle any errors that occurred during retrieval
        console.error("Error:", error);
      });
  }, []);

  const savedData = useSelector((state) => state?.globalReducer);
  useEffect(() => {
    setUsername(savedData?.userName);
    setPassword(savedData?.password);
  }, []);

  const [showPassword, setShowPassword] = useState(true);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const loadCredentials = async () => {
    try {
      const savedUsername = await SecureStore.getItemAsync("username");
      const savedPassword = await SecureStore.getItemAsync("password");

      if (savedUsername && savedPassword) {
        setUsername(savedUsername);
        setPassword(savedPassword);
        console.log("Credentials loaded successfully!");
      }
    } catch (error) {
      console.error("Error loading credentials:", error);
    }
  };
  useEffect(() => {
    // Load saved credentials on component mount
    loadCredentials();
  }, []);

  useEffect(() => {
    updateLastActivity();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
      <ImageBackground
        resizeMode="cover"
        style={styles.image}
        source={require("../../assets/images/bg-login.png")}
      >
        <View
          style={{
            ...styles.headerContainer,
            flex:
              Platform.OS === "ios"
                ? headerFlexContainerIos(Dimensions.get("screen").height)
                : headerFlexContainerAndroid(Dimensions.get("screen").height),
          }}
        >
          <View style={styles.logoWrapper}>
            <Image
              source={require("../../assets/images/logoFis.png")}
              // width={constants.SCREEN_WIDTH * (1 / 2)}
              // height={constants.SCREEN_WIDTH * (1 / 2)}
              width={12}
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.formContiner}>
            <View style={{ paddingBottom: 18 }}>
              <Text style={{ fontWeight: 600 }}>WELCOME TO FAMS HR</Text>
              <Divider bold style={{ marginTop: 24 }} />
            </View>

            <Text>Username</Text>
            <TextInput
              placeholder={
                handlerChangeLanguage === 0
                  ? "masukkan username"
                  : "enter username/email"
              }
              mode="outlined"
              theme={{ roundness: 10 }}
              defaultValue={username}
              value={username}
              hasErrors={authFailed}
              messageError="Wrong Username/Password"
              onChangeText={(e) => setUsername(e)}
              style={styles.inputUserName}
            />

            <Text>Password</Text>

            <TextInput
              placeholder={
                handlerChangeLanguage === 0
                  ? "masukkan password"
                  : "enter password"
              }
              mode="outlined"
              defaultValue={password}
              value={password}
              theme={{ roundness: 10 }}
              hasErrors={authFailed}
              secureTextEntry={showPassword}
              messageError="Wrong Username/Password"
              onChangeText={(e) => setPassword(e)}
              style={styles.inputUserPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye" : "eye-off"}
                  color={COLORS.PRIMARY_DARK}
                  onPress={togglePassword}
                />
              }
            />
            <HelperText type="error" visible={authFailed}>
              "Wrong Username/Password"
            </HelperText>

            <View style={styles.rowContiner}>
              <TouchableOpacity
                onPress={isClockIn ? handleLoginClockIn : handleLogin}
              >
                {handlerChangeLanguage === 0 ? (
                  <Text style={styles.lupaEP}>
                    Lupa Password{" "}
                    <Icon
                      name="question-circle"
                      size={17}
                      color={COLORS.PRIMARY_MEDIUM}
                    />
                  </Text>
                ) : (
                  <Text style={styles.lupaEP}>
                    Forget Password{" "}
                    <Icon
                      name="question-circle"
                      size={17}
                      color={COLORS.PRIMARY_MEDIUM}
                    />
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <GeneralButton
              style={styles.gettingButton}
              mode="contained"
              onPress={handleLoginClockIn}
            >
              Login
            </GeneralButton>
          </View>
          <View style={styles.logoCopyRight}>
            <Image
              source={require("../../assets/images/copyright.png")}
              // width={constants.SCREEN_WIDTH * (1 / 2)}
              // height={constants.SCREEN_WIDTH * (1 / 2)}
              width={14}
            />
          </View>
        </View>

        <View
          style={{
            ...styles.footerContainer,
            flex:
              Platform.OS === "ios"
                ? footerFlexContainerIos(Dimensions.get("screen").height)
                : footerFlexContainerAndroid(Dimensions.get("screen").height),
          }}
        >
          <View style={styles.contentButtonContainer}></View>
          <View style={{ flex: 1 }}>
            {/* <BgLogin
            width={'100%'}
            preserveAspectRatio="none"
            height={'100%'}
            style={{position: 'absolute', bottom: 0}}
          />
          <VectLogin style={styles.vectLog} height={'70%'} /> */}
          </View>
        </View>
      </ImageBackground>

      {authLoading ? (
        <PopUpLoader visible={true} />
      ) : (
        <PopUpLoader visible={false} />
      )}

      <FlashMessage statusBarHeight={30} />
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  // CONTAINER
  container: { flex: 1 },
  // ITEMS CONTAINER
  headerContainer: {
    justifyContent: "center",
    // backgroundColor: 'yellow',
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 2,
    padding: 36,
    // backgroundColor: 'green',
  },
  contentButtonContainer: {
    flex: 0.7,
    paddingHorizontal: 20,
    // backgroundColor: 'brown',
    flexDirection: "column",
  },
  footerContainer: {
    // backgroundColor: 'gray',
  },

  // HEADER ITEMS STYLE
  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 108,
  },
  logoCopyRight: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  gettingButton: { marginTop: 10 },

  inputUserName: { backgroundColor: COLORS.GRAY_SOFT, borderRadius: 10 },
  inputUserPassword: { backgroundColor: COLORS.GRAY_SOFT },
  rememberMe: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  lupaEP: {
    color: COLORS.PRIMARY_MEDIUM,
  },
  bhsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  txtBhs: {
    marginHorizontal: 5,
    fontSize: FONTS.v15,
    borderRadius: 10,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    // fontFamily: "Barlow",
  },

  // ITEMS CONTENT INPUT WRAPPER
  formContiner: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 8,
  },
  rowContiner: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  // BUTTON WRAPPER BOTTOM STYLES
  rowBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
  },
  btnContainer1: {
    flex: 1,
    paddingRight: 10,
  },
  btnContainer2: {
    flex: 1,
    paddingLeft: 10,
  },

  // FOOTER ITEMS
  vectLog: { position: "absolute", bottom: 0, left: -20 },
  cpyrht: {
    fontSize: FONTS.v11,
    fontWeight: "600",
    // fontFamily: "Barlow",
    textAlign: "center",
    color: COLORS.WHITE,
    position: "absolute",
    left: 100,
    bottom: 20,
  },
});
