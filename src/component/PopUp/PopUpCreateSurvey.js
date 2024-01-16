import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PopUp from '.';
import GeneralButton from './../GeneralButton';
import IcoTask from '../../../assets/images/svg/task.svg';
import {COLORS} from '../../../assets/theme';

const PopUpCreateSurvey = (props) => {
  const {visible, onPressClose, onPressCreate, TetxModal} = props;
  return (
    <PopUp visible={visible} style={styles.popup}>
      <View style={{alignItems: 'center'}}>
        <IcoTask />
        <Text style={styles.txtPop}>{TetxModal}</Text>
        <View style={styles.btnWrapp}>
          <GeneralButton
            style={styles.btnPop}
            mode="outlined"
            onPress={onPressClose}>
            Batalkan
          </GeneralButton>
          <GeneralButton
            style={styles.btnPop}
            mode="contained"
            onPress={onPressCreate}>
            Buat Survey
          </GeneralButton>
        </View>
      </View>
    </PopUp>
  );
};

export default PopUpCreateSurvey;

const styles = StyleSheet.create({
  popup: {width: '83%', paddingVertical: 20},
  txtPop: {fontSize: 17, textAlign: 'center', color: '#374062', width: '90%'},
  btnWrapp: {flexDirection: 'row'},
  btnPop: {
    marginTop: 28,
    width: '50%',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY_MEDIUM,
  },
});
