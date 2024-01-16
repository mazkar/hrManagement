import React, { useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
} from "react-native";
import {
  ItemSurveyOpen,
  PopUpLoader,
  RefreshScreen,
  SurveyEmpty2,
  GeneralButton,
  GeneralTextInput,
  TextInputCamera,
} from "../../component/index.js";
import { Image } from "expo-image";
import moment from "moment";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { ImageManipulator } from "expo";
import {
  Dialog,
  Portal,
  Divider,
  Button,
  Modal,
  SegmentedButtons,
} from "react-native-paper";
import axios from "axios";
import { Camera } from "expo-camera";
import constants from "../../assets/constants";
import { COLORS, ICONS } from "../../assets/theme";
import * as Permissions from "expo-permissions";
import ItemDetail from "../../component/Data/itemDetail.js";
import MaterialDetail from "../../component/Data/materialDetail.js";
import FaIcons from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Entypo } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import ImagePicker from "../../component/widget/Camera/ImagePicker.js";
import { launchCameraAsync } from "expo-image-picker";
import ImageView from "react-native-image-viewing";
import ImageViewer from "react-native-image-zoom-viewer";
import { baseUrl } from "../../utils/apiURL.js";
import * as Location from "expo-location";

const DetailTaskInTransit = ({ route, listData, navigation, orderReqId }) => {
  const dispatch = useDispatch();
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [dataInfo, setDataInfo] = useState([]);
  const [dataItem, setDataItem] = useState([]);
  const currentDate = new Date().getTime();
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = React.useState(false);
  const userId = useSelector((state) => state.auth.userId);
  const [modalSuccesVis, setModalSuccessVis] = useState(false);
  const [value, setValue] = React.useState("HO");
  const [startCamera, setStartCamera] = React.useState(false);
  const [startCamera2, setStartCamera2] = React.useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [dataEvidance, setDataEvidance] = useState([]);
  const [photoEvidance, setPhotoEvidance] = useState([]);
  // const location = useSelector((state) => state.locationReducer);
  const [deliveryEvidenceId1, setDeliveryEvidence1] = useState(null);
  const [deliveryEvidenceId2, setDeliveryEvidence2] = useState([]);
  const [dataEvidanceChecklist1, setDataEvidanceChecklist1] = useState([]);
  const [dataEvidanceChecklist2, setDataEvidanceChecklist2] = useState([]);
  // const [capturedImage, setCapturedImage] = useState(null);

  //value Form
  const [valueRecipentName, setValueRecipientName] = useState("");
  const [valueNotes, setValueNotes] = useState("");

  const [imgArray, setImgArray] = useState([]);
  const [imgArray2, setImgArray2] = useState([]);
  const [imgArray64, setImgArray64] = useState([]);
  const [imgArray642, setImgArray642] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log("denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location, "current");
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  const addItemToArray = (img) => {
    // Create a copy of the array and append the new item
    const newArray = [...imgArray, img.assets[0]];

    // Update the state with the new array
    setImgArray(newArray);
  };
  const addItemToArray2 = (img) => {
    // Create a copy of the array and append the new item
    const newArray = [...imgArray2, img.assets[0]];

    // Update the state with the new array
    setImgArray2(newArray);
  };
  const addItemToArray64 = (img) => {
    // Create a copy of the array and append the new item
    const newArray = [...imgArray64, img];

    // Update the state with the new array
    setImgArray64(newArray);
  };
  const addItemToArray642 = (img) => {
    // Create a copy of the array and append the new item
    const newArray = [...imgArray642, img];

    // Update the state with the new array
    setImgArray642(newArray);
  };

  const onChngeTab = async (tab) => {
    console.log(tab);
    setValue(tab);
  };

  const showModal = () => {
    setModalSuccessVis(true);
  };
  const hideModalSuccess = () => {
    setModalSuccessVis(false);
    navigation.navigate("Task");
  };

  async function getTaskDetail(id) {
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/transportarrangement/getOrderRequestBasedOnTransportArrangement/${id}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        // console.log(res.data, "detail");
        setDataInfo(res.data);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  async function getTaskDetailItem(id) {
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/transportassignment/getOrderReqItemList/${id}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        // console.log(res.data, "detail item");
        setDataItem(res.data);
        // setDataInfo(res.data);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function getDataEvidance(transportId, assignmentId, odr) {
    console.log(transportId, assignmentId, odr, "params");
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/transportarrangement/getTransportAssignmentEvidenceCheclist/${transportId}/${assignmentId}/${odr}`,
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(transportId, assignmentId);
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.data, "data Evidance");
        setDataEvidance(res.data);
        setDataEvidanceChecklist1[res.data[0]?.getEvidenceChecklists];
        setDataEvidanceChecklist1[res.data[1]?.getEvidenceChecklists];
        setDeliveryEvidence1[res.data[0]?.deliveryEvidenceChecklistId];
        setDeliveryEvidence2[res.data[1]?.deliveryEvidenceChecklistId];
        // setDataInfo(res.data);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDispathed(assignmentId, id, uid) {
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/transportassignment/actPickupConfirmed/${assignmentId}/${id}/${uid}`,
        method: "put",
        timeout: 8000,
        data: "",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        // console.log(res, "detail item");
        setModalSuccessVis(true);
        setVisible(false);

        // setDataItem(res.data);
        // setDataInfo(res.data);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUploadPhoto(
    assignmentId,
    tid,
    deliveryEvidenceChecklistId,
    img
  ) {
    setLoadingUpload(true);
    try {
      // console.log(body);
      let res = await axios({
        url: `${baseUrl.URL}api/transportassignment/transportAssignmentDeliveryEvidenceUploadBase64`,
        method: "post",
        timeout: 8000,
        data: {
          assignmentId: assignmentId,
          transportArrangementId: tid,
          deliveryEvidenceChecklistId: deliveryEvidenceChecklistId,
          photoBase64: img._j,
          orderReqId: route.params.orderReqId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        setLoadingUpload(false);
        console.log(res, "detail item");
        setModalSuccessVis(true);
        setVisible(false);

        // setDataItem(res.data);
        // setDataInfo(res.data);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  const storeAssignmentId = (data) => {
    // Process the received locations as needed
    AsyncStorage.clear()
      .then(() => {
        console.log("Data stored successfully");
      })
      .catch((error) => {
        console.error("Error storing data:", error);
      });
  };

  async function handleConfirm(assignmentId, tid, uid) {
    console.log(
      {
        transportTypeArrangementId: assignmentId,
        transportArrangmentId: tid,
        LMBY: uid,
        actualRecipientName: valueRecipentName,
        notes: valueNotes,
        orderReqId: route.params.orderReqId,
        confirmLongitude: location?.coords?.longitude.toString(),
        confirmLatitude: location?.coords?.latitude.toString(),
      },
      "params"
    );
    // try {
    //   let res = await axios({
    //     url: `${baseUrl.URL}api/transportassignment/actDeliveryComplete`,
    //     method: "post",
    //     timeout: 8000,
    //     data: {
    //       transportTypeArrangementId: assignmentId,
    //       transportArrangmentId: tid,
    //       LMBY: uid,
    //       actualRecipientName: valueRecipentName,
    //       notes: valueNotes,
    //       orderReqId: route.params.orderReqId,
    //       confirmLongitude: location?.coords?.longitude.toString(),
    //       confirmLatitude: location?.coords?.latitude.toString(),
    //     },
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": " application / json",
    //     },
    //   });
    //   if (res.status == 200) {
    //     // test for status you want, etc
    //     setLoadingUpload(false);
    //     console.log(res, "confirm");
    //     setModalSuccessVis(true);
    //     setVisible(false);
    //     storeAssignmentId(0);
    //     // setDataItem(res.data);
    //     // setDataInfo(res.data);
    //   }
    //   // Don't forget to return something
    //   return res.data;
    // } catch (err) {
    //   console.error(err);
    // }
  }

  const handleUploadFotobulk = (assignmentId, tid, dataEvidanceId) => {
    imgArray64.forEach(function (img) {
      handleUploadPhoto(assignmentId, tid, dataEvidanceId, img);
    });
  };

  const handleUploadFotobulk2 = (assignmentId, tid, dataEvidanceId) => {
    imgArray642.forEach(function (img) {
      handleUploadPhoto(assignmentId, tid, dataEvidanceId, img);
    });
  };

  useEffect(() => {
    getTaskDetail(route.params.transportArrangementId);
    getTaskDetailItem(route.params.assignmentId);
    getDataEvidance(
      route.params.transportArrangementId,
      route.params.assignmentId,
      route.params.orderReqId
    );
  }, []);

  // const [hasPermission, setHasPermission] = useState(null);
  // const [camera, setCamera] = useState(null);
  // const [capturedPhoto, setCapturedPhoto] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  // const takePicture = async () => {
  //   if (camera) {
  //     const photo = await camera.takePictureAsync();
  //     setCapturedPhoto(photo);
  //   }
  // };

  // if (hasPermission === null) {
  //   return <View />;
  // }

  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  const convertImageToBase64 = async (img) => {
    try {
      const base64String = await FileSystem.readAsStringAsync(img.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 'base64String' now contains the base64 representation of the image
      return base64String;
      console.log(base64String);
    } catch (error) {
      console.log(error);
    }
  };
  const convertImageToBase642 = async (img) => {
    try {
      const base64String = await FileSystem.readAsStringAsync(
        img.assets[0]?.uri,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );

      // 'base64String' now contains the base64 representation of the image
      // setImage64(base64String);
      return base64String;

      console.log(base64String);
    } catch (error) {
      console.log(error);
    }
  };

  // const __startCamera = () => {
  //   setStartCamera(true);
  // };

  // const __startCamera2 = () => {
  //   console.log("camera active");

  //   setStartCamera2(true);
  // };

  // const __takePicture = async () => {
  //   if (!camera) return;
  //   const photo = await camera.takePictureAsync();

  //   console.log(photo);
  //   setPreviewVisible(true);
  //   setCapturedImage(photo);
  //   setStartCamera(false);
  // };

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  // coba

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [image64, setImage64] = useState(null);
  const [image2, setImage2] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  // const takePicture = async () => {
  //   if (cameraRef) {
  //     try {
  //       const data = await cameraRef.current.takePictureAsync({ quality: 0.5 });
  //       console.log(data);

  //       addItemToArray(data);
  //       addItemToArray64(convertImageToBase64(data));
  //       setStartCamera(false);
  //     } catch (e) {
  //       console.log(e, "error");
  //     }
  //   }
  // };

  // const takePicture2 = async () => {
  //   if (cameraRef) {
  //     try {
  //       const data = await cameraRef.current.takePictureAsync({ quality: 0.5 });

  //       addItemToArray2(data);
  //       addItemToArray642(convertImageToBase642(data));

  //       setStartCamera2(false);
  //     } catch (e) {
  //       console.log(e, "error");
  //     }
  //   }
  // };

  async function takeImageandler(pht) {
    const data = await launchCameraAsync({
      allowsEditing: true,

      quality: 0.5,
    });
    if (pht == 1) {
      addItemToArray(data);
      addItemToArray64(convertImageToBase642(data));
    } else if (pht == 2) {
      addItemToArray2(data);
      addItemToArray64(convertImageToBase642(data));
    }
  }

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === "granted");
    })();
  });

  const [viewFoto, setViewFoto] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setViewFoto(true);
    console.log(index);
  };

  // Function to close the modal
  const closeModal = () => {
    setViewFoto(false);
  };

  const [viewFoto2, setViewFoto2] = useState(false);
  const [selectedImageIndex2, setSelectedImageIndex2] = useState(0);

  const openModal2 = (index) => {
    setSelectedImageIndex2(index);
    setViewFoto2(true);
    console.log(index);
  };

  // Function to close the modal
  const closeModal2 = () => {
    setViewFoto2(false);
  };

  return (
    <>
      <View style={styles.btnSurveyWrapper}>
        <SegmentedButtons
          value={value}
          checkedColor={"#663"}
          onValueChange={onChngeTab}
          buttons={[
            {
              value: "HO",
              label: "HO Completion",
            },
            {
              value: "Item",
              label: "Item List",
            },
          ]}
        />
      </View>
      {value == "HO" ? (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.formContiner}>
              <View style={{ paddingBottom: 28 }}>
                <Text style={{ fontSize: 18 }}>HO Completion</Text>
                {/* <Button onPress={() => console.log(location)}>test</Button> */}
              </View>

              <View>
                <Text style={{ fontWeight: "bold" }}>
                  Foto Penerima dan Barang yang diterima / Recipient photo
                  include item is received
                </Text>
                <ScrollView
                  horizontal
                  style={{
                    marginTop: 22,
                    marginBottom: 14,
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  {imgArray.map((img) => (
                    <>
                      <Image
                        source={{ uri: img?.uri }}
                        style={{
                          width: 100,
                          height: 100,
                          marginLeft: 8,
                          // flex: 1,
                          // flexDirection: "column",
                        }}
                      />
                    </>
                  ))}

                  {/* <Button onPress={() => console.log(photo)}>test</Button> */}
                </ScrollView>
                <View
                  style={{
                    backgroundColor: "#fff",
                    marginBottom: 3,
                    marginTop: 24,
                    // backgroundColor: "red",
                    // justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => takeImageandler(1)}
                    // onPress={__startCamera}
                    style={{
                      width: 130,
                      borderRadius: 4,
                      backgroundColor: "#14274e",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Take picture
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginTop: 24 }}>
                <Text style={{ fontWeight: "bold" }}>
                  BA Document Signed Photo
                </Text>
                <ScrollView
                  horizontal
                  style={{
                    backgroundColor: "transparent",
                    marginTop: 22,
                    marginBottom: 14,
                  }}
                >
                  {imgArray2.map((img) => (
                    <Image
                      source={{ uri: img?.uri }}
                      style={{
                        width: 100,
                        marginLeft: 8,
                        height: 100,
                        flex: 1,
                        flexDirection: "column",
                        alignSelf: "flex-start",
                      }}
                    />
                  ))}

                  {/* <Button onPress={() => console.log(photo)}>test</Button> */}
                </ScrollView>
                <View
                  style={{
                    backgroundColor: "#fff",
                    marginBottom: 36,
                    marginTop: 24,
                    // justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    // onPress={__startCamera2}
                    onPress={() => takeImageandler(2)}
                    style={{
                      width: 130,
                      borderRadius: 4,
                      backgroundColor: "#14274e",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Take picture
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text>Recepient Name</Text>
              <GeneralTextInput
                placeholder="Recepient Name"
                mode="outlined"
                value={valueRecipentName}
                // hasErrors={authFailed}
                // messageError="Wrong Username/Password"
                onChangeText={(e) => setValueRecipientName(e)}
                style={styles.inputUserName}
              />
              <Text>Notes</Text>

              <GeneralTextInput
                placeholder="Notes"
                mode="outlined"
                value={valueNotes}
                // hasErrors={authFailed}
                // messageError="Wrong Username/Password"
                onChangeText={(e) => setValueNotes(e)}
                style={styles.inputUserName}
              />
              {valueRecipentName == "" &&
              imgArray64.length === 0 &&
              imgArray642.length === 0 ? (
                <></>
              ) : (
                <GeneralButton
                  style={styles.surveyButton}
                  mode="contained"
                  onPress={() => setVisible(true)}
                >
                  Delivery Complete
                </GeneralButton>
              )}
            </View>
          </ScrollView>

          <Portal>
            <Dialog visible={visible}>
              <Dialog.Icon icon={<FaIcons name="check-circles" />} />
              <Dialog.Title style={styles.title}>
                {dataInfo[0]?.orderReqNo}
              </Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  Are you sure want to dispatch this order request ?
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setVisible(false)}>Cancel</Button>
                <Button
                  onPress={() =>
                    handleConfirm(
                      route.params.assignmentId,
                      route.params.transportArrangementId,
                      userId
                    )
                  }
                >
                  Ok
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalSuccesVis}
            onRequestClose={hideModalSuccess}
          >
            {/* <View style={styles.centeredView}> */}
            <View style={styles.containermodalView}>
              <View style={styles.imgSubmit}>
                <FaIcons
                  name="check-circle"
                  style={{ fontSize: 72, color: COLORS.SUCCESS }}
                />
              </View>
              <Text style={styles.modalText}>
                Order Request Dispatched Success
              </Text>
              <GeneralButton
                style={styles.gettingButton}
                mode="contained"
                onPress={hideModalSuccess}
              >
                Close
              </GeneralButton>
            </View>
            {/* </View> */}
          </Modal>
          {loadingUpload ? (
            <PopUpLoader visible={true} />
          ) : (
            <PopUpLoader visible={false} />
          )}
        </View>
      ) : (
        // Component tab material list

        <View style={styles.container}>
          <Text style={{ fontSize: 18, marginBottom: 12 }}>
            Order Request Info
          </Text>
          {/* <Button onPress={() => console.log(route)}>test</Button> */}
          {isLoading && <PopUpLoader visible={true} />}
          {errorMessage.message === "Request failed with status code 500" ? (
            <></>
          ) : !isLoading && !!errorMessage ? (
            <RefreshScreen style={styles.refresh} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listData} // center emptyData component
              // data={surveyOpen}
              data={dataInfo}
              keyExtractor={(item) => item.transportArrangementId}
              renderItem={({ item, index }) => (
                <ItemDetail
                  style={styles.itemSurveyOpen}
                  index={index + 1}
                  orderReqNo={item.orderReqNo !== null ? item.orderReqNo : "-"}
                  originAddress={
                    item.originAddress !== null ? item.originAddress : "-"
                  }
                  destinationAddress={
                    item.destinationAddress !== null
                      ? item.destinationAddress
                      : "-"
                  }
                  onPress={() => {
                    // dispatch(surveyTimeAction.setSurveyTime(new Date().getTime()));
                    // navigationSurvey(item);
                    console.log("Nav");
                  }}
                />
              )}
              ListEmptyComponent={
                <SurveyEmpty2 label1="Anda Belum Memiliki Task Tersedia" />
              }
            />
          )}
          <Text style={{ fontSize: 18, marginBottom: 12 }}>Material List</Text>
          {isLoading && <PopUpLoader visible={true} />}
          {errorMessage.message === "Request failed with status code 500" ? (
            <></>
          ) : !isLoading && !!errorMessage ? (
            <RefreshScreen style={styles.refresh} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listData} // center emptyData component
              // data={surveyOpen}
              data={dataItem}
              keyExtractor={(item) => item.dataItem}
              renderItem={({ item, index }) => (
                <MaterialDetail
                  style={styles.itemSurveyOpen}
                  index={index + 1}
                  orderReqNo={
                    item.custOrderReqNo !== null ? item.custOrderReqNo : "-"
                  }
                  itemCode={item.itemCode !== null ? item.itemCode : "-"}
                  itemDesc={item.itemDesc !== null ? item.itemDesc : "-"}
                  itemQty={item.itemQty !== null ? item.itemQty : "-"}
                  uom={item.uom !== null ? item.uom : "-"}
                  onPress={() => {
                    // dispatch(surveyTimeAction.setSurveyTime(new Date().getTime()));
                    // navigationSurvey(item);
                    console.log("Nav");
                  }}
                  ListEmptyComponent={
                    <SurveyEmpty2 label1="Anda Belum Memiliki Task Tersedia" />
                  }
                />
              )}
            />
          )}
          {/* Modal to display the selected image */}
        </View>
      )}
      <Modal visible={viewFoto} transparent={true} onRequestClose={closeModal}>
        {/* ImageViewer provides pinch-to-zoom functionality */}
        <TouchableOpacity onPress={closeModal}>
          <Image
            source={{ uri: imgArray[selectedImageIndex]?.uri }}
            style={{
              width: "100%",
              height: "100%",

              // flex: 1,
              // flexDirection: "column",
            }}
          />
        </TouchableOpacity>
      </Modal>
      <Modal
        visible={viewFoto2}
        transparent={true}
        onRequestClose={closeModal2}
      >
        {/* ImageViewer provides pinch-to-zoom functionality */}
        <TouchableOpacity onPress={closeModal2}>
          <Image
            source={{ uri: imgArray2[selectedImageIndex2]?.uri }}
            style={{
              width: "100%",
              height: "100%",

              // flex: 1,
              // flexDirection: "column",
            }}
          />
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default DetailTaskInTransit;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    width: "100%",
    paddingVertical: 32,
  },
  containeri: {
    flex: 1,
    backgroundColor: "#000",
  },
  itemSurveyOpen: { marginBottom: 20 },
  listData: { flexGrow: 1, marginBottom: 96 },
  surveyEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    backgroundColor: "black",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.RED_TRANSPARENT,
    paddingHorizontal: 20,
  },
  containermodalView: {
    flexDirection: "column",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 28,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
  },
  inputUserName: { backgroundColor: COLORS.GRAY_SOFT },
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
  btnSurveyWrapper: {
    paddingHorizontal: 38,
    marginTop: 42,
    marginBottom: 32,
    // paddingVertical: 12,
    // flex: 1,
    // flexDirection: "column",
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
  },
  formContiner: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
});
