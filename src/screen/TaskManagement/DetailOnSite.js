import React, { useEffect, useId, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
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

import constants from "../../assets/constants/index.js";
import { COLORS, ICONS } from "../../assets/theme/index.js";

import ItemDetail from "../../component/Data/itemDetail.js";
import MaterialDetail from "../../component/Data/materialDetail.js";
import FaIcons from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  startLocationUpdates,
  stopLocationUpdates,
} from "../../utils/backgroundTask.js";
import OrderReqList from "../../component/Data/orderReqList.js";
import * as Location from "expo-location";
import { baseUrl } from "../../utils/apiURL.js";

const DetailOnSite = ({
  route,
  listData,
  navigation,
  totalOrderRequest,
  totalOnsite,
}) => {
  const dispatch = useDispatch();
  const [dataInfo, setDataInfo] = useState([]);
  const [dataItem, setDataItem] = useState([]);
  const currentDate = new Date().getTime();
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [visibleBulk, setVisibleBulk] = React.useState(false);
  const userId = useSelector((state) => state.auth.userData.uid);
  const [modalSuccesVis, setModalSuccessVis] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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

  // const stateslc = useSelector((state) => console.log('all state =>', state));
  const showModal = () => {
    setModalSuccessVis(true);
  };
  const hideModalSuccess = () => {
    setModalSuccessVis(false);
    navigation.navigate("Task");
    // getTaskDetail(route.params.assignmentId);
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
    console.log(id, "param");
    try {
      let res = await axios({
        url: `${baseUrl.URL}api/transportassignment/getCustOrderReqList/${id}`,
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

        setDataItem(res.data);
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
        startLocationUpdates();
        console.log(res, "detail item");
        setModalSuccessVis(true);
        setVisible(false);
        storeAssignmentId(assignmentId.toString());
        startLocationUpdates();
        // setDataItem(res.data);
        // setDataInfo(res.data);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  async function handleOnSite(assignmentId, userId, ord) {
    // setLoadingUpload(true);
    console.log(
      {
        transportTypeArrangementId: assignmentId,
        orderReqId: ord,
        LMBY: userId,
        confirmLongitude: location?.coords?.longitude.toString(),
        confirmLatitude: location?.coords?.latitude.toString(),
        // confirmLongitude: location.coords.longitude,
        // confirmLatitude: location.coords.latitude,
      },
      "body"
    );
    try {
      // console.log(body);
      let res = await axios({
        url: `${baseUrl.URL}api/transportassignment/actOnsiteConfirmed`,
        method: "PUT",
        timeout: 8000,
        data: {
          transportTypeArrangementId: assignmentId,
          orderReqId: ord,
          LMBY: userId,
          confirmLongitude: location?.coords?.longitude.toString(),
          confirmLatitude: location?.coords?.latitude.toString(),
          notes: `on site at coordinates : long : ${location?.coords?.longitude.toString()}, lat: ${location?.coords?.latitude.toString()}`,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        // setLoadingUpload(false);
        getTaskDetail(route.params.assignmentId);
        console.log(res, "Success");
        setModalSuccessVis(true);
        setVisible(false);
        setVisibleBulk(false);

        // setDataItem(res.data);
        // setDataInfo(res.data);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err, "error");
    }
  }

  async function handleOnSiteBulk(assignmentId, userId, ord) {
    // setLoadingUpload(true);
    console.log(
      {
        transportTypeArrangementId: assignmentId,
        orderReqId: 0,
        LMBY: userId,
        confirmLongitude: location?.coords?.longitude.toString(),
        confirmLatitude: location?.coords?.latitude.toString(),
        // confirmLongitude: location.coords.longitude,
        // confirmLatitude: location.coords.latitude,
      },
      "body"
    );
    try {
      // console.log(body);
      let res = await axios({
        url: `${baseUrl.URL}api/transportassignment/actOnsiteConfirmed`,
        method: "PUT",
        timeout: 8000,
        data: {
          transportTypeArrangementId: assignmentId,
          orderReqId: 0,
          LMBY: userId,
          confirmLongitude: location?.coords?.longitude.toString(),
          confirmLatitude: location?.coords?.latitude.toString(),
          notes: `on site at coordinates : long : ${location?.coords?.longitude.toString()}, lat: ${location?.coords?.latitude.toString()}`,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        // setLoadingUpload(false);
        getTaskDetail(route.params.assignmentId);
        console.log(res, "Success");
        setModalSuccessVis(true);
        setVisible(false);

        // setDataItem(res.data);
        // setDataInfo(res.data);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err, "error");
    }
  }

  useEffect(() => {
    getTaskDetail(route.params.assignmentId);
    getTaskDetailItem(route.params.assignmentId);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Button onPress={() => console.log(route.params.totalOnsite, route.params.totalOrderRequest)}>
        test
      </Button> */}
      {/* <Text>{totalOrderRequest}</Text> */}
      {/* <Text style={{ fontSize: 18, marginBottom: 12 }}>Order Request Info</Text>

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
              originAddress={item.originAddress !== null ? item.originAddress : "-"}
              destinationAddress={item.destinationAddress !== null ? item.destinationAddress : "-"}
              onPress={() => {
                console.log("Nav");
              }}
            />
          )}
          ListEmptyComponent={<SurveyEmpty2 label1="Anda Belum Memiliki Task Tersedia" />}
        />
      )} */}
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Order Request List</Text>
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
          keyExtractor={(item) => item.custOrderReqNo}
          renderItem={({ item, index }) => (
            <OrderReqList
              style={styles.itemSurveyOpen}
              index={index + 1}
              handleOnSite={handleOnSite}
              onsiteStatus={item.onsiteStatus}
              modalSuccesVis={modalSuccesVis}
              hideModalSuccess={hideModalSuccess}
              orderReqNo={
                item.custOrderReqNo !== null ? item.custOrderReqNo : "-"
              }
              totalItem={item.totalItem !== null ? item.totalItem : "-"}
              orderReqId={item.orderReqId}
              token={token}
              hoStatus={item.hoStatus}
              userId={userId}
              visible={visible}
              setVisible={setVisible}
              hasGroup={route.params.hasGroup}
              navigation={navigation}
              transportArrangementId={route.params.transportArrangementId}
              assignmentId={route.params.assignmentId}
              // itemDesc={item.itemDesc !== null ? item.itemDesc : "-"}
              // itemQty={item.itemQty !== null ? item.itemQty : "-"}
              // uom={item.uom !== null ? item.uom : "-"}
              onPress={() => {
                // dispatch(surveyTimeAction.setSurveyTime(new Date().getTime()));
                // navigationSurvey(item);
                console.log("Nav");
              }}
              ListEmptyComponent={
                <SurveyEmpty2 label1="Anda Belum Memiliki Order Request" />
              }
            />
          )}
        />
      )}

      {/* <GeneralButton style={styles.surveyButton} mode="contained" onPress={() => setVisible(true)}>
        Item List
      </GeneralButton> */}

      {route.params.hasGroup == "yes" &&
      route.params.totalOnsite != route.params.totalOrderRequest ? (
        <GeneralButton
          style={styles.surveyButton}
          mode="contained"
          onPress={() => setVisibleBulk(true)}
        >
          On Site
        </GeneralButton>
      ) : (
        <></>
      )}

      {/* <GeneralButton style={styles.surveyButton} mode="contained" onPress={() => setVisible(true)}>
        HO Completion
      </GeneralButton> */}
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Icon icon={<FaIcons name="check-circles" />} />
          <Dialog.Title style={styles.title}>
            {dataInfo[0]?.orderReqNo}
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure want to On Site Assignment ?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button
              onPress={() => handleOnSite(route.params.assignmentId, userId, 0)}
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog visible={visibleBulk}>
          <Dialog.Icon icon={<FaIcons name="check-circles" />} />
          <Dialog.Title style={styles.title}>
            {dataInfo[0]?.orderReqNo}
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure want to On Site Assignment ?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleBulk(false)}>Cancel</Button>
            <Button
              onPress={() => handleOnSite(route.params.assignmentId, userId, 0)}
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
          <Text style={styles.modalText}>On Site Confirmed Success</Text>
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
    </View>
  );
};

export default DetailOnSite;

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

