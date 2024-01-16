import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS, FONTS, ICONS} from '../../../assets/theme';
import TextError from '../TextError';
const DateTimePckrAndroAfter = ({
  label = '',
  placeHolder = '',
  dates,
  errorHandler = false,
  showPickerDate = false,
  handlerCloseError = false,
  labelError = '',
  setValues,
  disableDate,
}) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [mode, setMode] = useState('date');

  // ANDROID
  const [numbersMode, setNumbersMod] = useState(0);

  const showDatePicker = () => {
    setIsPickerShow(true);
    setMode('date');
  };

  const handleClosePicker = () => {
    setIsPickerShow(false);
    setNumbersMod(0);
  };

  const showTimePickerAndroid = () => {
    console.log('numbersMode WKWKKW', numbersMode);
    setNumbersMod(0 + 1);
    if (numbersMode === 0) {
      setMode('time');
    }
    if (numbersMode === 1) {
      handleClosePicker();
      setIsPickerShow(false);
    }
  };

  const onChange = (event, value) => {
    const currentDate = value || dates;
    setValues(currentDate);
    if (Platform.OS === 'android') {
      showTimePickerAndroid();
    }
  };

  const formatDate = (datePickers) => {
    return `${datePickers.getDate()}/${
      datePickers.getMonth() + 1
    }/${datePickers.getFullYear()} ${datePickers.getHours()}:${datePickers.getMinutes()}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>{label}</Text>
      {errorHandler && handlerCloseError === false ? (
        <TextError label={labelError} />
      ) : null}
      <TouchableOpacity
        style={styles.pickedDateContainer}
        onPress={showDatePicker}>
        <Text
          style={{
            color: showPickerDate ? COLORS.BLACK : COLORS.GRAY_MEDIUM,
          }}>
          {showPickerDate ? formatDate(dates) : placeHolder}
        </Text>
        <ICONS.IconCalender />
      </TouchableOpacity>
      {isPickerShow && (
        <React.Fragment>
          <DateTimePicker
            value={dates}
            mode={mode}
            display={'default'}
            is24Hour={true}
            minimumDate={disableDate} // disable past & future date | you can use => {moment().toDate()}
            // maximumDate={new Date()} // disable past & future date
            onChange={onChange}
          />
        </React.Fragment>
      )}
    </View>
  );
};

export default DateTimePckrAndroAfter;

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
