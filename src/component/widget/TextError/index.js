import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../../../assets/theme';

const TextError = ({label = '', style}) => {
  return (
    <React.Fragment>
      <Text style={[styles.textError, style]}>{label}</Text>
    </React.Fragment>
  );
};

export default TextError;

const styles = StyleSheet.create({
  textError: {
    color: COLORS.PRIMARY_MEDIUM,
    paddingVertical: 5,
  },
});
