import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../../assets/constants/ResponsiveScreen';
import {COLORS, FONTS} from '../../../assets/theme';
import {ICONS} from '../../../assets/theme';
import {GeneralButton} from '../..';

const SurveyEmpty = ({label1 = '', label2 = ''}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerContent}>
        <View style={styles.imgContainer}>
          <ICONS.IconSurveyEmpty />
        </View>
        <Text style={styles.titleError}>{label1}</Text>
        <Text style={styles.subtitleError}>{label2}</Text>
        {/* <GeneralButton onPress={() => refresh()} mode="contained">
          Coba Lagi
        </GeneralButton> */}
      </View>
    </View>
  );
};

export default SurveyEmpty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
    position: 'absolute',
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP('100%'),
  },
  containerContent: {
    backgroundColor: COLORS.RED_TRANSPARENT,
    width: widthPercentageToDP('90%'),
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleError: {
    fontSize: FONTS.v15,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    color: COLORS.WHITE,
    marginTop: 10,
    textAlign: 'center',
  },
  subtitleError: {
    fontSize: FONTS.v13,
    color: COLORS.WHITE,
    marginBottom: 10,
    textAlign: 'center',
  },
});
