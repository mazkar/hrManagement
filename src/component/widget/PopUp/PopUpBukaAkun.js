import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PopUp from '.';
import IcoDone from '../../../assets/images/svg/done.svg';

const PopUpBukaAkun = (props) => {
  const {visible, onPress} = props;
  return (
    <PopUp visible={visible} style={styles.popup}>
      <View style={{alignItems: 'center'}}>
        <IcoDone />
        <Text style={styles.txtPop}>
          Buat Akun Sukses, Mohon Cek Email Untuk Konfirmasi
        </Text>
      </View>
    </PopUp>
  );
};

export default PopUpBukaAkun;

const styles = StyleSheet.create({
  txtPop: {fontSize: 17, textAlign: 'center', color: '#374062', marginTop: 16},
});
