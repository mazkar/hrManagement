import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text, Linking } from "react-native";
import {
  ItemSurveyOpen,
  PopUpLoader,
  RefreshScreen,
  SurveyEmpty2,
  GeneralButton,
  ModalSucces,
} from "../../component/index.js";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Portal, Button, Modal } from "react-native-paper";
import axios from "axios";

import constants from "../../assets/constants";
import { COLORS, ICONS } from "../../assets/theme";

import ItemDetail from "../../component/Data/itemDetail.js";
import MaterialDetail from "../../component/Data/materialDetail.js";
import FaIcons from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  startLocationUpdates,
  stopLocationUpdates,
} from "../../utils/backgroundTask.js";
import { baseUrl } from "../../utils/apiURL.js";
import * as Location from "expo-location";

const DetailTaskPending = ({ route, listData, navigation }) => {
  const dispatch = useDispatch();
  const [dataInfo, setDataInfo] = useState([]);
  const [dataItem, setDataItem] = useState([]);
  const currentDate = new Date().getTime();
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [visibleWarn, setVisibleWarn] = React.useState(false);
  const userId = useSelector((state) => state.auth?.userData?.uid);
  const [modalSuccesVis, setModalSuccessVis] = useState(false);
  const [location, setLocation] = useState(null);
  const [expandMaterial, setExpandMaterial] = useState(false);
  const [selectedOrderReq, setSelectedOrderReq] = useState(null);
  const [flagItem, setFlagItem] = useState([]);
  // AsyncStorage.multiGet(["key", "assignmentId"])

  function openLocationSettings() {
    Linking.openSettings();
  }

  // const stateslc = useSelector((state) => console.log('all state =>', state));
  const showModal = () => {
    setModalSuccessVis(true);
  };
  const hideModalSuccess = () => {
    setModalSuccessVis(false);
    navigation.navigate("Task");
  };

  const storeAssignmentId = (data) => {
    // Process the received locations as needed
    AsyncStorage.setItem("assignmentId", data)
      .then(() => {
        console.log("Data stored successfully");
      })
      .catch((error) => {
        console.error("Error storing data:", error);
      });
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
        console.log(res.data, "task detail", id, "tansportId");
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
        console.log(res.data, "detail item", id, "assignmnetId");
        setDataItem(
          res.data.filter((e) => e.custOrderReqNo == selectedOrderReq)
        );
        setFlagItem(res.data);
        // setDataInfo(res.data);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSendLoc(assignmentId, loc) {
    try {
      let res = await axios({
        url: `https://flog-api.nsnebast.com/api/transportassignment/transportLocationAdd`,
        method: "post",
        timeout: 8000,
        data: {
          assignmentId: assignmentId,
          longitude: loc?.longitude.toString(),
          latitude: loc?.latitude.toString(),
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

  async function handleDispathed(assignmentId, id, uid) {
    if (location == null) {
      setVisibleWarn(true);
    } else {
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
          startLocationUpdates();
          console.log(res, "detail item");
          setModalSuccessVis(true);
          setVisible(false);
          storeAssignmentId(assignmentId.toString());
          startLocationUpdates();
          handleSendLoc(assignmentId, location);
          // setDataItem(res.data);
          // setDataInfo(res.data);
        }
        // Don't forget to return something
        return res.data;
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    getTaskDetail(route.params.transportArrangementId);
    // getTaskDetailItem(route.params.assignmentId);
  }, []);

  useEffect(() => {
    // getTaskDetail(route.params.transportArrangementId);
    getTaskDetailItem(route.params.assignmentId);
  }, [selectedOrderReq, expandMaterial]);

  useEffect(() => {
    (async () => {
      // Request permission to access the device's location
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Get the current location
      let { coords } = await Location.getCurrentPositionAsync({});

      setLocation(coords);
    })();
  }, [visibleWarn]);

  const getLoc = () => {
    (async () => {
      // Request permission to access the device's location
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Get the current location
      let { coords } = await Location.getCurrentPositionAsync({});

      setLocation(coords);
    })();
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Order Request Info</Text>
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
            <>
              <ItemDetail
                style={styles.itemSurveyOpen}
                index={index + 1}
                dataItem={dataItem}
                orderReqNo={item.orderReqNo !== null ? item.orderReqNo : "-"}
                originAddress={
                  item.originAddress !== null ? item.originAddress : "-"
                }
                destinationAddress={
                  item.destinationAddress !== null
                    ? item.destinationAddress
                    : "-"
                }
                flagItem={flagItem}
                setExpandMaterial={setExpandMaterial}
                expandMaterial={expandMaterial}
                setSelectedOrderReq={setSelectedOrderReq}
                selectedOrderReq={selectedOrderReq}
                onPress={() => {
                  // dispatch(surveyTimeAction.setSurveyTime(new Date().getTime()));
                  // navigationSurvey(item);
                  console.log("Nav");
                }}
              />
              {expandMaterial && selectedOrderReq == item?.orderReqNo ? (
                <>
                  <View style={{ flexDirection: "column", marginBottom: 32 }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "500",
                        marginBottom: 2,
                      }}
                    >
                      Material List {selectedOrderReq}
                    </Text>
                    <View
                      style={{
                        backgroundColor: "black",
                        borderBottomColor: COLORS.PRIMARY_MEDIUM,
                        borderBottomWidth: 4,
                        width: 24,
                      }}
                    />
                  </View>
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
                          item.custOrderReqNo !== null
                            ? item.custOrderReqNo
                            : "-"
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
                </>
              ) : null}
            </>
          )}
          ListEmptyComponent={
            <SurveyEmpty2 label1="Anda Belum Memiliki Task Tersedia" />
          }
        />
      )}
      {/* <Text style={{ fontSize: 18, marginBottom: 12 }}>Material List</Text>
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
      )} */}
      {route.params.isPickup?.toLowerCase() == "yes" ? (
        <GeneralButton
          style={styles.surveyButton}
          mode="contained"
          onPress={() => setVisible(true)}
        >
          Accept
        </GeneralButton>
      ) : (
        <GeneralButton
          style={styles.surveyButton}
          mode="contained"
          onPress={() => setVisible(true)}
        >
          Dispatched
        </GeneralButton>
      )}

      {/* <Button onPress={() => getLoc(location)}>test</Button>
      <Button onPress={() => console.log(location)}>test2</Button> */}
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
                handleDispathed(
                  route.params.assignmentId,
                  route.params.transportArrangementId,
                  userId
                )
              }
              // onPress={() => {
              //   handleSendLoc(1, location);
              // }}
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
          <Text style={styles.modalText}>Order Request Dispatched Success</Text>
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
      <Portal>
        <Dialog visible={visibleWarn}>
          <Dialog.Icon icon={<FaIcons name="location-arrow" />} />
          {/* <Dialog.Title>Alert</Dialog.Title> */}
          <Dialog.Content>
            <Text variant="bodyMedium">
              To Continue, Please Enable or Allow GPS Location
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            {/* <Button onPress={() => setVisible(false)}>Cancel</Button> */}
            <Button onPress={openLocationSettings}>Ok</Button>
            <Button onPress={() => setVisibleWarn(false)}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DetailTaskPending;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    width: "100%",
    paddingVertical: 32,
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
});
