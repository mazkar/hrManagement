import React, { useState } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import { COLORS } from "../../../assets/theme";
import { Button, Menu, Divider, Avatar, Card } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import Octicons from "react-native-vector-icons/Octicons";
import FaIcons from "react-native-vector-icons/Ionicons";
import { ms } from "react-native-size-matters";

const AppBar = (props) => {
  const { title, onPressNav, icoRight } = props;
  const [notifVisible, setNotifVisible] = useState(false);

  // Notification

  const showNotif = () => {
    setNotifVisible(true);
  };

  const closeNotif = () => {
    setNotifVisible(false);
  };

  return (
    <View style={styles.appBarContainer}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../../assets/images/famsLogo3.png")}
            // width={constants.SCREEN_WIDTH * (1 / 2)}
            // height={constants.SCREEN_WIDTH * (1 / 2)}
            width={14}
            style={{ width: 104, height: 28 }}
          />
        </View>
      </View>

      <View style={styles.notif}>
        <View>
          <Menu
            visible={notifVisible}
            onDismiss={closeNotif}
            anchor={
              <FaIcons
                onPress={showNotif}
                style={{
                  fontSize: 22,
                  color: COLORS.PRIMARY_MEDIUM,
                  marginRight: 12,
                  color: COLORS.PRIMARY_DARK,
                }}
                name={
                  notifVisible ? "notifications-sharp" : "notifications-outline"
                }
              />
            }
          >
            {props.dataTaskPending?.map((e) => {
              return (
                <>
                  <Menu.Item
                    onPress={() => {}}
                    title={`Task ${props.dataTaskPending[0].transportAssignmentRefId} Assigned to You`}
                  />
                  <Divider />
                </>
              );
            })}
          </Menu>
        </View>
        {/* <View>
          <Avatar.Text size={28} label="MA" color={COLORS.WHITE} />
        </View> */}
      </View>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: COLORS.WHITE,
    justifyContent: "space-between",
    flexDirection: "row",
    // flex: 1,

    alignItems: "center",
    height: 80,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
    borderColor: Platform.OS === "ios" ? COLORS.GRAY_MEDIUM : null,
  },
  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  notif: {
    // paddingVertical: 4,

    // marginTop: ms(16),

    // paddingVertical: 12,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: 'red',
    // alignItems: 'flex-end',
  },
  appBarText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
