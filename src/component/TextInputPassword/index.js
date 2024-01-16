import * as React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput as TxtInputPaper} from 'react-native-paper';
import {COLORS} from '../../../assets/theme';

const TextInput = ({placeholder, icoPress, ...rest}) => {
  return (
    <TxtInputPaper
      placeholder={placeholder}
      theme={{roundness: 10}}
      right={
        <TxtInputPaper.Icon
          // name={icoPress ? 'eye' : 'eye-off'}
          name={'eye'}
          color={COLORS.GRAY_MEDIUM}
          onPress={icoPress}
        />
      }
      {...rest}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({});
