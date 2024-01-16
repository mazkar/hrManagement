import React from "react";
import { StyleSheet, Text, View, Platform, Button } from "react-native";
import {
  ItemSurveyOpen,
  PopUpLoader,
  RefreshScreen,
  SurveyEmpty2,
  GeneralButton,
  ModalSucces,
} from "../../component/index.js";
import { COLORS, FONTS } from "../../assets/theme";
import { useNavigation } from "@react-navigation/native";

const ItemDetail = (props) => {
  const navigation = useNavigation();
  const {
    style,
    orderReqNo,
    originAddress,
    destinationAddress,
    onPress,
    setExpandMaterial,
    expandMaterial,
    selectedOrderReq,
    setSelectedOrderReq,
    flagItem,
  } = props;

  const onPressExpand = () => {
    setExpandMaterial(true);
    setSelectedOrderReq(orderReqNo);
  };

  const hideExpand = () => {
    setExpandMaterial(false);
    setSelectedOrderReq(null);
  };
  return (
    <View style={[styles.container, style]}>
      <View style={styles.txtContainer}>
        <View style={styles.txtRowContainer}>
          {/* <Text style={[styles.txt1, { marginRight: 4 }]}>{index}.</Text> */}
          <View>
            <Text style={[styles.txt3, { marginBottom: 8 }]}>
              Order Request
            </Text>
            <View>
              <View style={styles.txtRowContainer}>
                <Text style={styles.txt2}>Order Req</Text>
                <View style={{ marginLeft: 20 }}>
                  <Text style={styles.txt2}> : </Text>
                </View>

                <Text style={[styles.txt1, { marginBottom: 8 }]}>
                  {
                    <Text style={[styles.txt1, { marginBottom: 8 }]}>
                      {orderReqNo}
                    </Text>
                  }
                </Text>
              </View>
              <View style={styles.txtRowContainer}>
                <Text style={styles.txt2}>Origin</Text>
                <View style={{ marginLeft: 44 }}>
                  <Text style={styles.txt2}> : </Text>
                </View>

                <Text style={[styles.txt1, { marginBottom: 8 }]}>
                  {originAddress}
                </Text>
              </View>
              <View style={styles.txtRowContainer}>
                <Text style={styles.txt2}>Destination</Text>

                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.txt2}> : </Text>
                </View>
                <View style={{ width: "68%" }}>
                  <Text
                    style={[styles.txt1, { marginBottom: 8 }]}
                    numberOfLines={10}
                  >
                    {destinationAddress}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {flagItem?.length == 0 ? (
          <GeneralButton
            mode="contained"
            // onPress={() => onPressExpand(true)}
            style={{
              backgroundColor: COLORS.GRAY_SOFT,
              marginTop: 12,
            }}
          >
            View Material Detail
          </GeneralButton>
        ) : expandMaterial && selectedOrderReq == orderReqNo ? (
          <GeneralButton
            mode="contained"
            onPress={() => hideExpand(false)}
            style={{
              backgroundColor: COLORS.PRIMARY_MEDIUM,
              marginTop: 12,
            }}
          >
            Close Material Detail
          </GeneralButton>
        ) : (
          <GeneralButton
            mode="contained"
            onPress={() => onPressExpand(true)}
            style={{
              backgroundColor: COLORS.PRIMARY_DARK,
              marginTop: 12,
              marginLeft: 12,
            }}
          >
            View Material Detail
          </GeneralButton>
        )}
      </View>
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    padding: 18,
    borderRadius: 8,
    backgroundColor: COLORS.WHITE,
  },
  txt1: {
    fontSize: FONTS.v12,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    color: COLORS.PRIMARY_DARK,
  },
  txt2: {
    fontSize: FONTS.v12,
    fontWeight: "400",
    color: COLORS.PRIMARY_DARK,
    marginBottom: 8,
  },
  txt3: {
    fontSize: FONTS.v12,
    fontWeight: "400",
    color: COLORS.PRIMARY_DARK,
    marginBottom: 8,
  },
  txtContainer: { marginBottom: 16 },
  txtRowContainer: { flexDirection: "row", width: "100%" },
});
