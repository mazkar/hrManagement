import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import Mapbox from "@rnmapbox/maps";
import { useSelector } from "react-redux";
import { Button } from "react-native-paper";
import { ms } from "react-native-size-matters";
import { COLORS } from "../../../assets/theme";

Mapbox.setAccessToken(
  "sk.eyJ1IjoibWF6a2FyMjciLCJhIjoiY2xxdXMzMW8xNGIwMTJrcnlyaTM4eWRwaSJ9.mTY_nxq-fBI15FXQNiemUA"
);

const MapComp = ({ longitude, latitude, branchLongitude, branchLatitude }) => {
  const jakartaCoordinates = [106.8451, -6.2088]; // Jakarta coordinates: [longitude, latitude]
  const jakartaCoordinates2 = [106.8451, -6.2098]; // Jakarta coordinates: [longitude, latitude]
  const myCoordinate = [longitude, latitude];
  const branchCoordinate = [branchLongitude, branchLatitude];

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {/* <Button onPress={() => console.log(branchLatitude)}>{distance}</Button> */}
        <Mapbox.MapView style={styles.map}>
          <Mapbox.Camera zoomLevel={5} centerCoordinate={branchCoordinate} />

          {/* Marker and CircleLayer for Jakarta */}
          <Mapbox.MarkerView
            key="newYorkMarker"
            id="newYorkMarker"
            coordinate={branchCoordinate}
          >
            <Image
              source={require("../../../assets/images/building.png")}
              style={{ height: ms(22), width: ms(22) }}
            />
          </Mapbox.MarkerView>
          <Mapbox.CircleLayer
            id="circleLayerJakarta"
            style={{ circleRadius: 150, circleColor: "rgba(0, 128, 255, 0.5)" }}
            coordinates={branchCoordinate}
          />

          {/* Marker and CircleLayer for New York */}
          <Mapbox.PointAnnotation
            key="newYorkMarker"
            id="newYorkMarker"
            coordinate={myCoordinate}
          >
            <View style={styles.marker2} />
          </Mapbox.PointAnnotation>
          <Mapbox.CircleLayer
            id="circleLayerNewYork"
            style={{ circleRadius: 10, circleColor: "rgba(255, 0, 0, 0.5)" }}
            coordinates={[myCoordinate]}
          />
        </Mapbox.MapView>
      </View>
    </View>
  );
};

export default MapComp;

const styles = StyleSheet.create({
  page: {},
  container: {
    height: 200,
    width: "100%",
  },
  map: {
    flex: 1,
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
  },
  marker2: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY_DARK,
  },
});
