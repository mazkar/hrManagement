import React, {useState} from 'react';
import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
import {GeneralButton, TextError} from '../../../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS, FONTS, ICONS} from '../../../assets/theme';
const DatePicker = ({
  label = '',
  placeHolder = '',
  dates,
  setDates,
  errorHandler = false,
  labelError = '',
  resetErrorHandler = () => {},
}) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [showPickerDate, setShowPickerDate] = useState(false);
  const [date, setDate] = useState(new Date(Date.now())); // <<=== INI DIHAPUS GA MAS?
  const [mode, setMode] = useState('date');
  const [handlerCloseError, setHandlerCloseError] = useState(false);

  const showPicker = () => {
    setIsPickerShow(true);
    setMode('date');
  };

  const handleClosePicker = () => {
    setIsPickerShow(false);
  };

  const onChange = (event, value) => {
    const currentDate = value || dates;
    if (value) {
      setHandlerCloseError(true);
      setDates(currentDate);
      setShowPickerDate(true);
      resetErrorHandler();
    }
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  const formatDate = (datePickers) => {
    return `${datePickers.getDate()}/${
      datePickers.getMonth() + 1
    }/${datePickers.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>{label}</Text>
      {errorHandler && handlerCloseError === false ? (
        <TextError label={labelError} />
      ) : null}
      <TouchableOpacity style={styles.pickedDateContainer} onPress={showPicker}>
        <Text
          style={{
            color: showPickerDate ? COLORS.BLACK : COLORS.GRAY_MEDIUM,
          }}>
          {showPickerDate ? formatDate(dates) : placeHolder}
        </Text>
        <ICONS.IconCalender />
      </TouchableOpacity>
      {isPickerShow && (
        <>
          <DateTimePicker
            value={dates}
            mode={mode}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onChange}
          />
          {Platform.OS === 'ios' ? (
            <GeneralButton onPress={handleClosePicker} mode="contained">
              CLose
            </GeneralButton>
          ) : null}
        </>
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  pickedDateContainer: {
    marginTop: 5,
    borderColor: COLORS.GRAY_MEDIUM,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 18,
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: FONTS.v15,
    fontWeight: '600',
    color: COLORS.DARK,
    fontFamily: 'Barlow',
  },
  subTitle: {
    fontSize: FONTS.v13,
    fontFamily: 'Barlow',
    color: COLORS.DARK,
    fontWeight: 'normal',
    marginTop: 10,
  },
});
