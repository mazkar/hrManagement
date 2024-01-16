/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {COLORS, FONTS, ICONS} from '../../../assets/theme';
import TextError from '../TextError';

const DropDownAccordionMultiple = ({
  label = '',
  placeholder = '',
  labelError = '',
  nameState = '',
  itemsDropDown = [],
  value,
  errorHandler = false,
  handleChangesValues,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(itemsDropDown);
  const [handlerTypeAtmAround, sethandlerTypeAtmAround] = useState([]);
  const itemsListDropDown = numbers => {
    if (numbers === 2) {
      return 80;
    } else if (numbers === 3) {
      return 120;
    } else if (numbers === 12) {
      console.log('WOII');
      return 200;
    } else {
      return 160;
    }
  };

  useEffect(() => {
    const values = value || handlerTypeAtmAround;
    sethandlerTypeAtmAround(values);
  }, [sethandlerTypeAtmAround]);

  const handleChanesValues = item => {
    console.log('VALUE CHANGES VALUE', item);
    handleChangesValues(item, nameState);
    sethandlerTypeAtmAround(item);
  };

  const handlerOnChanges = item => {
    console.log('VALUE CHANGES VALUE WKWKWKW', item);
  };

  console.log('value.length', value.length);
  console.log('handlerTypeAtmAround.length', handlerTypeAtmAround.length);

  return (
    <React.Fragment>
      <Text style={styles.subTitle}>{label}</Text>
      {errorHandler && <TextError label={labelError} />}
      <View
        style={{
          marginBottom: open ? itemsListDropDown(itemsDropDown.length) : 0,
        }}>
        <DropDownPicker
          multiple={true}
          min={0}
          max={parseInt(items.length, 10)}
          placeholder={placeholder}
          open={open}
          value={handlerTypeAtmAround}
          items={items}
          setOpen={setOpen}
          setValue={sethandlerTypeAtmAround}
          onChangeValue={value => handleChanesValues(value)}
          onSelectItem={item => handlerOnChanges(item)}
          setItems={setItems}
          dropDownDirection="BOTTOM"
          placeholderStyle={styles.dropDownText}
          dropDownContainerStyle={styles.dropDownContainer}
          ArrowUpIconComponent={() => <ICONS.IconChevronUpArrow />}
          ArrowDownIconComponent={() => <ICONS.IconChevronDownArrow />}
          listMode="SCROLLVIEW"
          mode="BADGE"
          badgeDotColors={[COLORS.PRIMARY_MEDIUM]}
          badgeColors={[COLORS.GRAY_SOFT]}
          badgeTextStyle={{
            fontFamily: 'Barlow',
            fontSize: FONTS.v15,
          }}
          style={{
            borderWidth: open ? 2 : 1,
            borderColor: open ? COLORS.PRIMARY_MEDIUM : COLORS.GRAY_MEDIUM,
            height: 60,
          }}
        />
      </View>
    </React.Fragment>
  );
};

export default DropDownAccordionMultiple;

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
