import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  safeAreaDefaultBg: {
    flex: 1,
    backgroundColor: COLORS.GRAY_ULTRASOFT,
  },
  flex1: {flex: 1},
});

export default styles;
