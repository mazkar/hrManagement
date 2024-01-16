import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import imagePath from "../../../constants/imagePath";
import MapViewDirections from "react-native-maps-directions";
import Loader from "../../Loader";
import * as Location from "expo-location";
import { locationPermission, getCurrentLocation } from "./helper";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapTracker = ({ navigation }) => {
  const mapRef = useRef();
  const markerRef = useRef();
  const [current, setCurrent] = useState({
    latitude: -6.7560511,
    longitude: 108.4731847,
  });
  const [currentCoordinate, setCurrentCoordinate] = useState({
    latitude: -6.7560511,
    longitude: 108.4731847,
  });
  const [heading, setHeading] = useState(0);
  const [directionsData, setDirectionsData] = useState(null);
  const [isDirectionsReady, setDirectionsReady] = useState(false);

  const [state, setState] = useState({
    curLoc: {
      latitude: -6.7560511,
      longitude: 108.4731847,
    },
    destinationCords: {
      latitude: -6.732023,
      longitude: 108.552316,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: -6.732023,
      longitude: 108.552316,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
  });

  const { curLoc, time, distance, destinationCords, isLoading, coordinate } =
    state;
  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  useEffect(() => {
    getLiveLocation();
  }, []);

  const getLiveLocation = () => {
    Location.watchPositionAsync({ distanceInterval: 100 }, (location) => {
      console.log(
        "latiti =>",
        location?.coords.latitude,
        "longi =>",
        location?.coords.longitude,
        "COORD =>",
        location
      );

      setDirectionsReady(true);

      setCurrent({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setCurrentCoordinate(
        new AnimatedRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        })
      );
      setHeading(location?.coords.heading);
      // updateState({
      //   heading: heading,
      //   curLoc: {
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude,
      //   },
      //   coordinate: new AnimatedRegion({
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude,
      //     latitudeDelta: LATITUDE_DELTA,
      //     longitudeDelta: LONGITUDE_DELTA,
      //   }),
      // });
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 3000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: currentCoordinate.latitude,
      longitude: currentCoordinate.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  const fetchTime = (d, t) => {
    updateState({
      distance: d,
      time: t,
    });
  };

  useEffect(() => {
    animate(currentCoordinate.latitude, currentCoordinate.longitude);
  }, [coordinate]);

  return (
    <View style={styles.container}>
      {distance !== 0 && time !== 0 && (
        <View style={{ alignItems: "center", marginVertical: 16 }}>
          <Text>Time left: {time.toFixed(0)} </Text>
          <Text>Distance left: {distance.toFixed(0)} KM</Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          showsTraffic
          style={StyleSheet.absoluteFill}
          initialRegion={{
            ...current,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker.Animated
            ref={markerRef}
            tracksViewChange={false}
            coordinate={currentCoordinate}
          >
            <Image
              source={imagePath.icBike}
              style={{
                width: 40,
                height: 40,
                transform: [{ rotate: `${heading}deg` }],
              }}
              resizeMode="contain"
            />
          </Marker.Animated>

          <Marker
            coordinate={destinationCords}
            image={imagePath.icGreenMarker}
          />

          <MapViewDirections
            origin={current}
            destination={destinationCords}
            apikey="AIzaSyA44LnT122kXLwsaAl3wYmBJEP9dhcQ__c"
            strokeWidth={6}
            strokeColor="red"
            // optimizeWaypoints={true}
            onStart={(params) => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`
              );
            }}
            onReady={(result) => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);
              fetchTime(result.distance, result.duration),
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    // right: 30,
                    // bottom: 300,
                    // left: 30,
                    // top: 100,
                  },
                });
            }}
            onError={(errorMessage) => {
              // console.log('GOT AN ERROR');
            }}
          />
        </MapView>
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
          // onPress={onCenter}
          // onPress={() => console.log(state, "ini")}
          onPress={() => onCenter()}
        >
          <Image source={imagePath.greenIndicator} />
        </TouchableOpacity>
      </View>

      <Loader isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: "white",
    width: "100%",
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  inpuStyle: {
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    marginTop: 16,
  },
});

export default MapTracker;
