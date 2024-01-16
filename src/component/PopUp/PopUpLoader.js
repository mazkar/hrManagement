import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import PopUp from '.';
import {COLORS} from '../../../assets/theme';

const PopUpLoader = (props) => {
  const {visible} = props;
  return (
    <PopUp visible={visible} style={styles.popup}>
      <View style={{alignItems: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY_MEDIUM} />
      </View>
    </PopUp>
  );
};

export default PopUpLoader;

const styles = StyleSheet.create({
  popup: {width: '30%'},
  txtPop: {fontSize: 17, textAlign: 'center', color: '#374062', marginTop: 16},
});
