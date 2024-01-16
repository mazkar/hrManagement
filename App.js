import { View, Text, Alert, Platform } from "react-native";
import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Route from "./src/root/Route";
import { theme } from "./src/assets/theme";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/store/index";
import { setCurrentLocation } from "./src/store/models/location/action";
import { enableLatestRenderer } from "react-native-maps";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { BackgroundFetch } from "expo";
import {
  startLocationUpdates,
  stopLocationUpdates,
} from "./src/utils/backgroundTask";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserActivityProvider } from "./src/utils/UserActivityContext";

enableLatestRenderer();

export default function App() {
  const storeToken = (data) => {
    // Process the received locations as needed
    AsyncStorage.setItem("installationId", data)
      .then(() => {
        // console.log("Data stored successfully");
      })
      .catch((error) => {
        // console.error("Error storing data:", error);
      });
  };
  // useEffect(() => {
  //   Notifications.getExpoPushTokenAsync().then((token) => {
  //     console.log(token, "token push");
  //   });
  // });

  // useEffect(() => {
  //   async function configurePushNotifications() {
  //     const { status } = await Notifications.requestPermissionsAsync();

  //     if (status !== "granted") {
  //       Alert.alert("Permission Requaired");
  //       return;
  //     } else {
  //       const pusTokenData = await Notifications.getExpoPushTokenAsync();
  //       console.log(pusTokenData, "<= push token ");
  //     }
  //   }

  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.DEFAULT,
  //     });
  //   }

  //   configurePushNotifications();
  // });

  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log("Authorization status:", authStatus);
  //   }
  // };

  // useEffect(() => {
  //   startLocationUpdates();
  //   return () => {
  //     // Clean up or stop the location updates when the component unmounts
  //     stopLocationUpdates();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     messaging()
  //       .getToken()
  //       .then((token) => {
  //         console.log(token, "ini token");
  //         storeToken(token);
  //       });
  //   } else {
  //     console.log("failed to get token", authStatus);
  //   }

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(async (remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           "Notification caused app to open from quit state:",
  //           remoteMessage.notification
  //         );
  //         setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //       setLoading(false);
  //     });

  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(async (remoteMessage) => {
  //     console.log(
  //       "Notification caused app to open from background state:",
  //       remoteMessage.notification
  //     );
  //   });

  //   // Register background handler
  //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //     console.log("Message handled in the background!", remoteMessage);
  //   });

  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     Alert.alert(
  //       "You Have New Task!",
  //       JSON.stringify(remoteMessage.notification.body)
  //     );
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          {/* <FlashMessage statusBarHeight={30} /> */}
          <UserActivityProvider>
            <NavigationContainer>
              <Route />
            </NavigationContainer>
          </UserActivityProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
