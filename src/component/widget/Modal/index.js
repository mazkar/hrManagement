import React from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import { GeneralButton } from "../..";
import constants from "../../../assets/constants";
import { COLORS, ICONS } from "../../../assets/theme";

const ModalSucces = ({ showModal = false, closeModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.containermodalView}>
          <View style={styles.imgSubmit}>
            <ICONS.IconSuccesSubmitModal />
          </View>
          <Text style={styles.modalText}>Order Request Dispatched Success</Text>
          <GeneralButton
            style={styles.gettingButton}
            mode="contained"
            onPress={closeModal}
          >
            Kembali
          </GeneralButton>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSucces;

const styles = StyleSheet.create({
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
