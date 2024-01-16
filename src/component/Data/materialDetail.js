import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { GeneralButton } from "..";
import { COLORS, FONTS } from "../../assets/theme";
import { useNavigation } from "@react-navigation/native";
const MaterialDetail = (props) => {
  const { style, orderReqNo, itemCode, itemDesc, itemQty, uom, onPress } =
    props;
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
                <Text style={styles.txt2}>itemCode</Text>
                <Text style={styles.txt2}>itemDesc</Text>
                <Text style={styles.txt2}>itemQty</Text>
                <Text style={styles.txt2}>uom</Text>
              </View>
              <View>
                <Text style={styles.txt2}> : </Text>
                <Text style={styles.txt2}> : </Text>
                <Text style={styles.txt2}> : </Text>
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
                  {itemCode}
                </Text>
                <Text
                  style={[styles.txt1, { marginBottom: 8 }]}
                  numberOfLines={1}
                >
                  {itemDesc}
                </Text>
                <Text
                  style={[styles.txt1, { marginBottom: 8 }]}
                  numberOfLines={1}
                >
                  {itemQty}
                </Text>
                <Text
                  style={[styles.txt1, { marginBottom: 8 }]}
                  numberOfLines={1}
                >
                  {uom}
                </Text>
                {/* <Text style={[styles.txt1, { marginBottom: 8 }]}>
                  {totalOrderReq}
                </Text> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MaterialDetail;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    marginTop: 14,
    backgroundColor: COLORS.PRIMARY_MEDIUM,
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
});
