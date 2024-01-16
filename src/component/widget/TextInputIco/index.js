import * as React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput as TxtInputPaper} from 'react-native-paper';

const TextInput = ({placeholder, left, right, ...rest}) => {
  return (
    <TxtInputPaper
      placeholder={placeholder}
      theme={{roundness: 10}}
      left={<TxtInputPaper.Icon name={left} />}
      right={<TxtInputPaper.Icon name={right} />}
      {...rest}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({});
