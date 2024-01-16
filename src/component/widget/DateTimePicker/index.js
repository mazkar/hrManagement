import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
import {GeneralButton} from '../../../component/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS, FONTS, ICONS} from '../../../assets/theme';
import TextError from '../TextError';
const DateTimePickers = ({
  label = '',
  placeHolder = '',
  modesDate = 'date',
  dates,
  errorHandler = false,
  showPickerDate = false,
  handlerCloseError = false,
  labelError = '',
  onChange,
}) => {
  console.log('modesDate', modesDate);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [mode, setMode] = useState(modesDate);
  const [numberMode, setNumberMode] = useState(0);

  // ANDROID
  const [numbersMode, setNumbersMod] = useState(0);

  const showDatePicker = () => {
    setIsPickerShow(true);
    setMode('date');
    setNumberMode(1);
  };

  const showTimePicker = () => {
    setMode('time');
    setNumberMode(0);
  };

  const handleClosePicker = () => {
    setIsPickerShow(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setNumbersMod(0);
    }, 200);
  }, [numbersMode]);

  const formatDate = datePickers => {
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
            display={'spinner'}
            is24Hour={true}
            // minimumDate={new Date()} // disable past & future date | you can use => {moment().toDate()}
            // maximumDate={new Date()} // disable past & future date
            onChange={onChange}
          />
          {Platform.OS === 'ios' ? (
            numberMode === 1 ? (
              <GeneralButton onPress={showTimePicker} mode="contained">
                Plih Jam
              </GeneralButton>
            ) : (
              <GeneralButton onPress={handleClosePicker} mode="contained">
                Tutup
              </GeneralButton>
            )
          ) : null}
        </React.Fragment>
      )}
    </View>
  );
};

export default DateTimePickers;

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
