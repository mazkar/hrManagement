import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const BACKGROUND_LOCATION_TASK = "background-location-task";
import { baseUrl } from "../utils/apiURL";

TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
  async function handleSendLoc(assignmentId, token, lat, long) {
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/transportassignment/transportLocationAdd`,
        method: "post",
        timeout: 8000,
        data: {
          assignmentId: assignmentId,
          longitude: long.toString(),
          latitude: lat.toString(),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res, "Sending Location");

        // setDataItem(res.data);
        // setDataInfo(res.data);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  if (error) {
    console.log("An error occurred in the background location task:", error);
    return;
  }

  if (data) {
    const { locations } = data;
    AsyncStorage.multiGet(["key", "assignmentId"])
      .then((jsonData) => {
        if (jsonData !== null) {
          const result = jsonData.map(([key, value]) => ({ key, value }));
          // Parse the retrieved data
          if (result[1]?.value != null) {
            handleSendLoc(
              parseInt(result[1]?.value),
              result[0]?.value,
              locations[0]?.coords.latitude,
              locations[0]?.coords.longitude
            );
          }

          console.log("Retrieved data:", result);
        } else {
          console.log("No data found");
        }
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
    console.log("Received locations:", locations);
  }
});

export async function startLocationUpdates() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Foreground location permission denied");
    return;
  }

  const backgroundPermission =
    await Location.requestBackgroundPermissionsAsync();
  if (backgroundPermission.status !== "granted") {
    console.log("Background location permission denied");
    return;
  }

  Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
    accuracy: Location.Accuracy.BestForNavigation,
    // distanceInterval: 2, // minimum distance (in meters) travelled before an update event is triggered
    deferredUpdatesInterval: 60000, // minimum time (in milliseconds) between update events
    // deferredUpdatesDistance: 2, // minimum distance (in meters) between update events
    foregroundService: {
      notificationTitle: "Background Location",
      notificationBody: "Continuously tracking location in the background",
    },
  });

  console.log("Location updates started");
}

export async function stopLocationUpdates() {
  Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
  console.log("Location updates stopped");
}
