import React from "react";
import { StyleSheet, Text, View, Platform, Image } from "react-native";
import { GeneralButton } from "..";
import { Card, Divider } from "react-native-paper";
import { COLORS, FONTS } from "../../assets/theme";
import { useNavigation } from "@react-navigation/native";
import { ms } from "react-native-size-matters";
const ItemSurveyOpen = (props) => {
  const navigation = useNavigation();
  const {
    style,
    transportAssignmentRefId,
    totalOrderReq,
    assigneDate,
    totalOnSite,
    index,
    indexTab,
    assignedBy,
    onPress,
    isPickup,
  } = props;
  return (
    <Card style={[styles.container, style]}>
      <View style={styles.txtContainer}>
        <View style={styles.txtRowContainer}>
          {/* <Text style={[styles.txt1, { marginRight: 4 }]}>{index}.</Text> */}

          <View>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{ height: 24, width: 24 }}
                source={require("../../assets/images/iconTask.png")}
              />
              {isPickup?.toLowerCase() == "yes" ? (
                <Text
                  style={[
                    styles.txt1,
                    {
                      marginBottom: ms(8),
                      marginTop: ms(4),
                      marginLeft: ms(4),
                    },
                  ]}
                >
                  Pickup Req {transportAssignmentRefId}
                </Text>
              ) : (
                <Text
                  style={[
                    styles.txt1,
                    {
                      marginBottom: ms(8),
                      marginTop: ms(4),
                      marginLeft: ms(4),
                    },
                  ]}
                >
                  {transportAssignmentRefId}
                </Text>
              )}
            </View>

            <Divider bold />
            <View style={styles.txtRowContainer}>
              <View>
                <Text style={styles.txt2}>ASSIGNED BY</Text>
                <Divider bold />
                <Text style={styles.txt2}>ASSIGNED DATE</Text>
                <Divider bold />
                <Text style={styles.txt2}>TOTAL ORDER REQUEST</Text>
                <Divider bold />
                {indexTab != 0 ? (
                  <>
                    <Text style={styles.txt2}>TOTAL ON SITE</Text>
                    <Divider bold />
                  </>
                ) : (
                  <></>
                )}
              </View>
              <View>
                <Text style={styles.txt2}> : </Text>
                <Divider bold />
                <Text style={styles.txt2}> : </Text>
                <Divider bold />
                <Text style={styles.txt2}> : </Text>
                <Divider bold />
                {indexTab != 0 ? (
                  <>
                    <Text style={styles.txt2}> : </Text>
                    <Divider bold />
                  </>
                ) : (
                  <></>
                )}
              </View>
              <View style={{ width: "68%" }}>
                <Text style={[styles.txt1, { marginBottom: 12 }]}>
                  {assignedBy}
                </Text>
                <Divider bold />
                <Text
                  style={[styles.txt1, { marginBottom: 12 }]}
                  numberOfLines={1}
                >
                  {assigneDate}
                </Text>
                <Divider bold />
                <Text style={[styles.txt1, { marginBottom: 12 }]}>
                  {totalOrderReq}
                </Text>
                <Divider bold />
                {indexTab != 0 ? (
                  <>
                    <Text style={[styles.txt1, { marginBottom: 12 }]}>
                      {totalOnSite}/{totalOrderReq}
                    </Text>
                    <Divider bold />
                  </>
                ) : (
                  <></>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
      {indexTab == 2 ? (
        <GeneralButton
          style={styles.surveyButton}
          mode="contained"
          onPress={onPress}
        >
          View Detail
        </GeneralButton>
      ) : (
        <GeneralButton
          style={styles.surveyButton}
          mode="contained"
          onPress={onPress}
        >
          Procceed
        </GeneralButton>
      )}
    </Card>
  );
};

export default ItemSurveyOpen;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    boder: "1px solid black",
    backgroundColor: COLORS.WHITE,
  },
  txt1: {
    fontSize: FONTS.v10,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    color: COLORS.DARK,

    marginTop: ms(6),
  },
  txt2: {
    fontSize: FONTS.v10,
    fontWeight: "500",
    color: COLORS.PRIMARY_DARK,
    marginBottom: 12,
    marginTop: ms(6),
  },
  txtContainer: { marginBottom: 16 },
  txtRowContainer: { flexDirection: "row" },
});
