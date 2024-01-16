import * as React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput as TxtInputPaper} from 'react-native-paper';

const TextInput = ({placeholder, left, ...rest}) => {
  return (
    <TxtInputPaper
      placeholder={placeholder}
      theme={{roundness: 10}}
      {...rest}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({});
