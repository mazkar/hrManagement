import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PopUp from '.';
import GeneralButton from './../GeneralButton';
import IcoTask from '../../../assets/images/svg/task.svg';

const PopUpDigitalChecklist = (props) => {
  const {visible, onPress} = props;
  return (
    <PopUp visible={visible} style={styles.popup}>
      <View style={{alignItems: 'center'}}>
        <IcoTask />
        <Text style={styles.txtPop}>Digital Checklist Berhasil Disubmit</Text>
        <GeneralButton style={styles.btnPop} mode="contained" onPress={onPress}>
          Kembali
        </GeneralButton>
      </View>
    </PopUp>
  );
};

export default PopUpDigitalChecklist;

const styles = StyleSheet.create({
  popup: {paddingVertical: 20},
  txtPop: {fontSize: 17, textAlign: 'center', color: '#374062', width: '90%'},
  btnPop: {marginTop: 28, width: '100%'},
});
