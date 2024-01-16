import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Platform, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GeneralButton } from "..";
import { COLORS, FONTS } from "../../assets/theme";
import { Button, Modal, Portal, Dialog } from "react-native-paper";
import axios from "axios";
import FaIcons from "react-native-vector-icons/FontAwesome5";
import MaterialDetail from "./materialDetail";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

const OrderReqList = (props) => {
  const {
    style,
    orderReqNo,
    itemCode,
    handleOnSite,
    totalItem,
    userId,
    hideModalSuccess,
    modalSuccesVis,
    orderReqId,
    token,
    onPress,
    hoStatus,
    onsiteStatus,
    hasGroup,
    setVisible,
    visible,
    route,
  } = props;
  const [isModalItemVisible, setIsModalItemVisble] = useState(false);
  const [dataItem, setDataItem] = useState([]);
  // const [visible, setVisible] = React.useState(false);

  async function getTaskDetailItem(id) {
    try {
      let res = await axios({
        url: `https://flog-api.nsnebast.com/api/logmanagement/getOrderRequestItemList/${id}`,
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
        console.log(res.data, "item order");
        // setDataInfo(res.data);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  const showModalItem = (stat) => {
    setIsModalItemVisble(stat);
    getTaskDetailItem(orderReqId);
  };

  const hideModalItem = () => {
    setIsModalItemVisble(false);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.txtContainer}>
        <View style={styles.txtRowContainer}>
          {/* <Text style={[styles.txt1, { marginRight: 4 }]}>{index}.</Text> */}
          <View>
            {/* <Text style={[styles.txt1, { marginBottom: 8 }]}>
              Order Request
            </Text> */}
            <View style={styles.txtRowContainer}>
              <View>
                <Text style={styles.txt2}>Order Req</Text>
                <Text style={styles.txt2}>Total Item</Text>
              </View>
              <View>
                <Text style={styles.txt2}> : </Text>
                <Text style={styles.txt2}> : </Text>
              </View>
              <View style={{ width: "68%" }}>
                <Text style={[styles.txt1, { marginBottom: 8 }]}>
                  {
                    <Text style={[styles.txt1, { marginBottom: 8 }]}>
                      {orderReqNo}
                    </Text>
                  }
                </Text>
                <Text style={[styles.txt1, { marginBottom: 8 }]}>
                  {totalItem}
                </Text>

                {/* <Text style={[styles.txt1, { marginBottom: 8 }]}>
                  {totalOrderReq}
                </Text> */}
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 12,
        }}
      >
        {isModalItemVisible ? (
          <Button
            style={{ backgroundColor: COLORS.PRIMARY_MEDIUM }}
            mode="contained"
            onPress={() => hideModalItem(false)}
          >
            Close Item
          </Button>
        ) : (
          <Button
            style={{ backgroundColor: COLORS.PRIMARY_DARK }}
            mode="contained"
            onPress={() => showModalItem(true)}
          >
            Item List
          </Button>
        )}

        {onsiteStatus == "notyet" ? (
          hasGroup == "no" ? (
            <>
              <Button
                style={{ backgroundColor: COLORS.PRIMARY_DARK }}
                mode="contained"
                onPress={() => setVisible(true)}
              >
                On Site
              </Button>
            </>
          ) : (
            <></>
          )
        ) : hoStatus?.toLowerCase() == "completed" ? (
          <Button
            style={{ backgroundColor: "green" }}
            mode="contained"
            // onPress={() => {
            //   props.navigation.navigate("DetailTaskInTransit", {
            //     transportArrangementId: props.transportArrangementId,
            //     assignmentId: props.assignmentId,
            //     isPickup: props.isPickup,
            //     orderReqId: orderReqId,
            //   });
            // }}
          >
            HO Complete
          </Button>
        ) : (
          <Button
            style={{ backgroundColor: COLORS.PRIMARY_DARK }}
            mode="contained"
            onPress={() => {
              props.navigation.navigate("DetailTaskInTransit", {
                transportArrangementId: props.transportArrangementId,
                assignmentId: props.assignmentId,
                isPickup: props.isPickup,
                orderReqId: orderReqId,
              });
            }}
          >
            HO Completion
          </Button>
        )}
      </View>
      {isModalItemVisible ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listData} // center emptyData component
          // data={surveyOpen}
          data={dataItem}
          keyExtractor={(item) => item.dataItem}
          renderItem={({ item, index }) => (
            <MaterialDetail
              style={styles.containerModalCard}
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
              // ListEmptyComponent={<SurveyEmpty2 label1="Anda Belum Memiliki Task Tersedia" />}
            />
          )}
        />
      ) : (
        <></>
      )}
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Icon icon={<FaIcons name="check-circles" />} />
          {/* <Dialog.Title style={styles.title}>{dataInfo[0]?.orderReqNo}</Dialog.Title> */}
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure want to On Site Assignment ?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button
              onPress={() =>
                handleOnSite(props.assignmentId, userId, orderReqId)
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

export default OrderReqList;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    marginTop: 14,
    backgroundColor: COLORS.WHITE,
  },
  containerModalCard: {
    padding: 8,
    borderRadius: 8,
    width: 1200,
    marginTop: 14,
    backgroundColor: COLORS.PRIMARY_MEDIUM,
  },
  containermodalView: {
    // flexDirection: "column",
    // alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 28,
    height: 1200,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
  },
  txt1: {
    fontSize: FONTS.v15,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    color: COLORS.PRIMARY_DARK,
  },
  txt2: {
    fontSize: FONTS.v15,
    fontWeight: "400",
    color: COLORS.PRIMARY_DARK,
    marginBottom: 8,
  },
  txtContainer: { marginBottom: 16 },
  txtRowContainer: { flexDirection: "row" },
  listData: { flexGrow: 1, marginBottom: 96 },
});

