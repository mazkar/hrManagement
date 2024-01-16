/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import TextError from '../TextError';
import {COLORS, FONTS} from '../../../assets/theme';

const AutoTextCompleteInput = ({
  placeholder = '',
  labelError = '',
  listMasterData = [],
  setTypingTextUser,
  typingTextUser,
  valuesUser,
  setValuesUser,
  handleError = false,
}) => {
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [focusTextInput, setFocusTextInput] = useState(false);
  const [lengthFilterData, setLengthFilterData] = useState(0);
  const [isRender, setIsRender] = useState(true);

  useEffect(() => {
    if (isRender) {
      if (listMasterData.length >= 1) {
        setFilterData(listMasterData);
        setMasterData(listMasterData);
        setIsRender(false);
      }
    }
    setIsRender(true);

    console.log(listMasterData, 'render2');
    console.log(isRender, 'isRender');
  }, [listMasterData, setIsRender]);

  const getDatasUser = (items) => {
    setValuesUser(items.atmId);
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.atmId
          ? item.atmId.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setLengthFilterData(newData.length);
      setFilterData(newData);
      setIsRender(true);
      setTypingTextUser(text);
    } else {
      setFilterData(masterData);
      setTypingTextUser(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      <TouchableOpacity onPress={() => getDatasUser(item)}>
        <Text style={styles.itemStyles}>{item.atmId}</Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <React.Fragment>
        <View
          style={{
            borderColor: COLORS.WHITE,
            borderWidth: 1,
          }}
        />
      </React.Fragment>
    );
  };

  const handlerOnKeyPress = ({nativeEvent}) => {
    if (nativeEvent.key === 'Backspace') {
      setTypingTextUser('');
      setValuesUser('');
    }
  };

  return (
    <View style={styles.container}>
      {handleError && <TextError label={labelError} />}
      <TextInput
        style={{
          ...styles.textInput,
          borderWidth: focusTextInput ? 2 : 1,
          borderColor: focusTextInput
            ? COLORS.PRIMARY_MEDIUM
            : COLORS.GRAY_MEDIUM,
          paddingVertical: focusTextInput ? 14 : 14,
          paddingLeft: focusTextInput ? 10 : 10,
        }}
        value={valuesUser === '' ? typingTextUser : valuesUser}
        placeholder={placeholder}
        onChangeText={(text) => searchFilter(text)}
        onKeyPress={handlerOnKeyPress}
        editable={true}
        onFocus={() => setFocusTextInput(true)}
        onBlur={() => setFocusTextInput(false)}
        selectionColor={TextInput ? COLORS.PRIMARY_MEDIUM : COLORS.GRAY_MEDIUM}
        placeholderTextColor={COLORS.GRAY_MEDIUM}
        keyboardType="default"
      />
      {typingTextUser.length > 0 &&
        valuesUser === '' &&
        lengthFilterData !== 0 && (
          <View style={styles.containerListItems}>
            <FlatList
              nestedScrollEnabled={true}
              maxHeight={180}
              data={filterData}
              keyExtractor={(item) => item.atmId}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
            />
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemStyles: {
    padding: 15,
  },
  textInput: {
    borderColor: COLORS.GRAY_MEDIUM,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    marginTop: 5,
    fontSize: FONTS.v14,
    fontFamily: 'Barlow',
  },
  containerListItems: {
    marginTop: 5,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: COLORS.GRAY_MEDIUM,
    backgroundColor: COLORS.GRAY_ULTRASOFT,
  },
});

export default AutoTextCompleteInput;
