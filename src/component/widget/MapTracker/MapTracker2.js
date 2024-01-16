import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { WebView } from "react-native-webview";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { getCurrentLocation, locationPermission } from "./helper";
import Geolocation from "react-native-geolocation-service";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.9222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapTracker = () => {
  const [lat, setLat] = useState(-6.2);
  const [long, setLong] = useState(106.816666);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   getLiveLocation();
  // }, []);

  // const getLiveLocation = async () => {
  //   const locPemrmissionDenied = await locationPermission();
  //   if (locPemrmissionDenied) {
  //     const res = await getCurrentLocation;
  //     console.log(res, "res loh");
  //   }
  // };

  const getLiveLocation = () => {
    Location.watchPositionAsync({ distanceInterval: 100 }, (location) => {
      console.log(
        "lat =>",
        location.coords.latitude,
        "long =>",
        location.coords.longitude
      );
      setLat(location.coords.latitude), setLong(location.coords.longitude);
    });
  };

  const getLocationPermission = async ({ navigation }) => {
    setIsLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // Handle permission not granted
    } else {
      Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
        setLat(location.coords.latitude), setLong(location.coords.longitude);
      });
      setIsLoading(false);
    }
  };

  const [state, setStae] = useState({
    pickupCords: {
      latitude: -6.7560511,
      longitude: 108.4731847,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    dropLocationCords: {
      latitude: -6.2,
      longitude: 106.816666,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });
  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const { pickupCords, dropLocationCords } = state;

  const mapRef = useRef();
  const markerRef = useRef();

  useEffect(() => {
    getLocationPermission();
  }, []);

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: lat,
      longitude: long,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        showsTraffic
        style={{ alignSelf: "stretch", height: "100%" }}
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 20,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker.Animated
          ref={markerRef}
          coordinate={{
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          // image={require("../../../assets/images/point.png")}
        />
        <Marker
          coordinate={dropLocationCords}
          // image={require("../../../assets/images/point.png")}
        />
        <MapViewDirections
          origin={{
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          destination={dropLocationCords}
          apikey="AIzaSyA44LnT122kXLwsaAl3wYmBJEP9dhcQ__c"
          strokeWidth={6}
          strokeColor="orange"
          onStart={(params) => {
            console.log(
              `Started routing between "${params.origin}" and "${params.destination}"`
            );
          }}
          optimizeWaypoints={true}
          onReady={(result) => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                // right: 30,
                // bottom: 300,
                // left: 30,
                // top: 100,
              },
            });
          }}
        />
      </MapView>
    </View>
  );
};

export default MapTracker;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
