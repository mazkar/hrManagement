import { View, Dimensions, Image, Platform } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginPage from "../screen/login";
import Dashboard from "../screen/Dashboard";
import Profile from "../screen/Profile";

import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import MapTracker from "../component/widget/MapTracker";
import TaskManagement from "../screen/TaskManagement";
import MapTracker2 from "../component/widget/MapTracker/MapTracker2";
import TaskManagementAdmin from "../screen/TaskManagement/TaskManagementAdmin";
import * as Location from "expo-location";
import { useEffect } from "react";
import { setCurrentLocation } from "../store/models/location/action";
import DetailTaskPending from "../screen/TaskManagement/DetailTask";
import DetailTaskInTransit from "../screen/TaskManagement/DetailTaskInTransit";
import DetailTaskDone from "../screen/TaskManagement/detailTaskDone";
import { COLORS } from "../assets/theme";
import { ms } from "react-native-size-matters";
import DetailOnSite from "../screen/TaskManagement/DetailOnSite";
import Attendance from "../screen/attendance";
import DashboardAbsence from "../screen/Dashboard/DashboardAbsence";
import ClockOut from "../screen/attendance/Checkout";
import HistoruAbsence from "../screen/HistoryAbsence";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function Route() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.auth?.token);
  const isClockIn = useSelector((state) => state?.auth.isClockIn);
  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // Handle permission not granted
    } else {
      Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
        dispatch(
          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          })
        );
      });
    }
  };

  useEffect(() => {
    getLocationPermission();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={token == null ? "Login" : "Main"}
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name="Splash" component={LoginPage} headerMode="screen" /> */}
      {/* <Stack.Screen name="Login" component={LoginPage} headerMode="screen" />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        headerMode="screen"
      /> */}
      <Stack.Screen
        name="Main"
        options={{ headerShown: false }}
        component={BottomNav}
        // headerMode="screen"
      />
      <Tab.Screen
        name="Login"
        component={LoginPage}
        // options={{headerShown: false}}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Tracker"
        component={MapTracker}
        // options={{headerShown: false}}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Tracker2"
        component={MapTracker2}
        // options={{headerShown: false}}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="DetailTaskPending"
        component={DetailTaskPending}
        // options={{headerShown: false}}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Attendance"
        component={Attendance}
        // options={{headerShown: false}}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ClockOut"
        component={ClockOut}
        // options={{headerShown: false}}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="DetailTaskInTransit"
        component={DetailTaskInTransit}
        // options={{headerShown: false}}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="DetailTaskDone"
        component={DetailTaskDone}
        // options={{headerShown: false}}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="DetailOnSite"
        component={DetailOnSite}
        // options={{headerShown: false}}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

export function BottomNav() {
  const Height = Dimensions.get("window").height;
  const isClockIn = useSelector((state) => state?.auth.isClockIn);

  return (
    <Tab.Navigator
      // tabBarOptions={{

      //   tabBarActiveBackgroundColor: 'red',
      //   style: {
      //     position: 'absolute',
      //     marginHorizontal: 20,
      //     bottom: 21,
      //     height: 60,
      //     elevation: 0,
      //     borderRadius: 40,
      //     backgroundColor: '#000',
      //   },
      // }}
      // tabBarOptions={{ showLabel: false }}
      screenOptions={({ route }) => ({
        // showLabel: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // borderTopLeftRadius: 24,
          // borderTopRightRadius: 24,
          // borderRadius: 14,
          // marginBottom: 12,
          // marginLeft: 18,
          // marginRight: 18,
        },
        tabBarIcon: ({ focused, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused
              ? require("../assets/images/homeActive.png")
              : require("../assets/images/home.png");
          } else if (route.name === "Task") {
            iconName = focused
              ? require("../assets/images/message.png")
              : require("../assets/images/message0.png");
          } else if (route.name === "Employee") {
            iconName = focused
              ? require("../assets/images/employeeActive.png")
              : require("../assets/images/employee.png");
          } else if (route.name === "Profile2") {
            iconName = focused
              ? require("../assets/images/userActive.png")
              : require("../assets/images/user.png");
          } else if (route.name === "DashboardAbsence") {
            iconName = focused
              ? require("../assets/images/homeActive.png")
              : require("../assets/images/home.png");
          } else if (route.name === "History") {
            iconName = focused
              ? require("../assets/images/historyActive.png")
              : require("../assets/images/history.png");
          }

          // You can return any component that you like here!
          return (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",

                width: 60,
                height: 30,
                borderRadius: 10,
                top:
                  Platform.OS === "ios" ? iphoneIconsPositionCenter(Height) : 0,
              }}
            >
              <Image
                source={iconName}
                resizeMode="contain"
                style={{ width: ms(72), height: ms(72) }}
              />
            </View>
          );
        },
      })}
    >
      {isClockIn ? (
        <>
          <Tab.Screen
            name="DashboardAbsence"
            component={DashboardAbsence}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="History"
            component={HistoruAbsence}
            options={{ headerShown: false }}
          />
          {/* <Tab.Screen
            name="Task"
            component={TaskManagement}
            options={{ headerShown: false }}
          /> */}
          {/* <Tab.Screen
            name="Task2"
            component={TaskManagementAdmin}
            options={{ headerShown: false }}
          /> */}
          {/* <Tab.Screen
            name="Employee"
            component={Profile}
            // options={{headerShown: false}}
            options={{ headerShown: false }}
          /> */}

          <Tab.Screen
            name="Profile2"
            component={Profile}
            // options={{headerShown: false}}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Task"
            component={TaskManagement}
            options={{ headerShown: false }}
          />
          {/* <Tab.Screen
            name="Task2"
            component={TaskManagementAdmin}
            options={{ headerShown: false }}
          /> */}
          {/* <Tab.Screen
            name="Employee"
            component={Profile}
            // options={{headerShown: false}}
            options={{ headerShown: false }}
          /> */}

          <Tab.Screen
            name="Profile2"
            component={Profile}
            // options={{headerShown: false}}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}
