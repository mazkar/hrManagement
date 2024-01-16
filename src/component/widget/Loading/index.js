import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../../assets/constants/ResponsiveScreen';
import {COLORS, FONTS} from '../../../assets/theme';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.horizontal}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY_MEDIUM} />
        <Text style={styles.textLoading}>Harap Tunggu Sebentar</Text>
      </View>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    position: 'absolute',
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP('100%'),
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textLoading: {
    color: COLORS.PRIMARY_MEDIUM,
    fontSize: FONTS.v15,
    marginTop: 20,
  },
});
