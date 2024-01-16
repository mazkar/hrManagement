import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

const CameraInput = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      console.log(photo);
      // You can handle the captured photo here, e.g., save it to state or send it to a server
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCamera(ref)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
            }}
            onPress={takePicture}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              Capture
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default Camera;
