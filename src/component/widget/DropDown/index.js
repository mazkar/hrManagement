/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {COLORS, FONTS, ICONS} from '../../../assets/theme';
import TextError from '../TextError';

const DropDownAccordion = ({
  label = '',
  placeholder = '',
  itemsDropDown = [],
  value,
  errorHandler = false,
  labelError = '',
  ...onValues
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(itemsDropDown);

  const itemsListDropDown = (numbers) => {
    if (numbers === 2) {
      return 80;
    } else if (numbers === 3) {
      return 120;
    } else {
      return 160;
    }
  };

  return (
    <React.Fragment>
      <Text style={styles.subTitle}>{label}</Text>
      {errorHandler && <TextError label={labelError} />}
      <View
        style={{
          marginBottom: open ? itemsListDropDown(itemsDropDown.length) : 0,
        }}>
        <DropDownPicker
          placeholder={placeholder}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setItems={setItems}
          dropDownDirection="BOTTOM"
          placeholderStyle={styles.dropDownText}
          dropDownContainerStyle={styles.dropDownContainer}
          ArrowUpIconComponent={() => <ICONS.IconChevronUpArrow />}
          ArrowDownIconComponent={() => <ICONS.IconChevronDownArrow />}
          listMode="SCROLLVIEW"
          style={{
            borderWidth: open ? 2 : 1,
            borderColor: open ? COLORS.PRIMARY_MEDIUM : COLORS.GRAY_MEDIUM,
            height: 60,
          }}
          {...onValues}
        />
      </View>
    </React.Fragment>
  );
};

export default DropDownAccordion;

const styles = StyleSheet.create({
  subTitle: {
    fontSize: FONTS.v13,
    fontFamily: 'Barlow',
    color: COLORS.DARK,
    fontWeight: 'normal',
    marginTop: 10,
    marginBottom: 5,
  },
  inputTextAccordion: {
    borderRadius: 10,
    borderColor: COLORS.GRAY_MEDIUM,
    overflow: 'hidden',
    borderWidth: 1,
    color: COLORS.GRAY_MEDIUM,
    backgroundColor: COLORS.WHITE,
  },
  dropDownText: {
    color: COLORS.GRAY_MEDIUM,
  },
  dropDownContainer: {
    borderColor: COLORS.GRAY_MEDIUM,
  },
});
