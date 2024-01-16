import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Button as ButtonPaper} from 'react-native-paper';

const styles = StyleSheet.create({
  root: {
    borderRadius: 6,
  },
  buttonFitText: {
    alignItems: 'flex-start',
  },
  labelButton: {
    textTransform: 'none',
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    fontFamily: 'Barlow',
  },
});

const Button = (props) => {
  const {children, isFitText, labelStyle, style} = props;
  return (
    <ButtonPaper
      {...props}
      labelStyle={[styles.labelButton, labelStyle]}
      style={[styles.root, isFitText && styles.buttonFitText, style]}>
      {children}
    </ButtonPaper>
  );
};

export default Button;
