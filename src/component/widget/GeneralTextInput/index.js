import * as React from "react";
import { StyleSheet } from "react-native";
import { TextInput as TxtInputPaper, HelperText } from "react-native-paper";

const TextInput = ({
  placeholder,
  left,
  hasErrors,
  value,
  messageError,
  ...rest
}) => {
  return (
    <>
      <TxtInputPaper
        placeholder={placeholder}
        theme={{ roundness: 10 }}
        {...rest}
      />
      {/* <HelperText type="error" visible={hasErrors}>
        {messageError}
      </HelperText> */}
    </>
  );
};

export default TextInput;

const styles = StyleSheet.create({});
