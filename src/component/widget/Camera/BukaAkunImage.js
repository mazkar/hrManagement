import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {COLORS, ICONS} from '../../../assets/theme';
import {GeneralButton, TextError} from '../..';

const BukaAkunImage = (props) => {
  const {
    onChangeValues,
    handlerNameChangesValues = '',
    namesPhoto = '',
    errorHandler = false,
    labelError = '',
    resetErrorHandler = () => {},
  } = props;
  // FUNCTION CAMERA
  const [namePicture, setNamePicture] = useState('');
  const [filePath, setFilePath] = useState(null);

  const openCamera = () => {
    const option = {
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.9,
      storageOption: {
        // skipBackup: true,
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchCamera(option, (response) => {
      // console.log('RESPONSE photo base64', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Camera Not Avaible');
        Alert.alert('Camera Not Avaible', response.errorCode, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('Camera Not Avaible')},
        ]);
      } else if (response.errorMessage) {
        Alert.alert('Error Message', response.errorMessage, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('Camera Not Avaible')},
        ]);
      } else if (response.assets) {
        onChangeValues(response.assets, handlerNameChangesValues);
        resetErrorHandler();
        let fileNamePict;
        response.assets.filter((res) => {
          if (res.fileName) {
            return (fileNamePict = res.fileName);
          }
        });
        setNamePicture(fileNamePict);
        let fileUri;
        response.assets.filter((res) => {
          if (res.uri) {
            return (fileUri = res.uri);
          }
        });
        setFilePath(fileUri);
      }
    });
  };

  const handlerUploadImages = () => {
    const options = {
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.9,
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      // console.log('RESPONSE photo base64', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Galeri Not Avaible');
        Alert.alert('Galeri Not Avaible', response.errorCode, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('Galeri Not Avaible')},
        ]);
      } else if (response.errorMessage) {
        Alert.alert('Error Message', response.errorMessage, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('Galeri Not Avaible')},
        ]);
      } else if (response.assets) {
        onChangeValues(response.assets, handlerNameChangesValues);
        resetErrorHandler();
        let fileNamePict;
        response.assets.filter((res) => {
          if (res.fileName) {
            return (fileNamePict = res.fileName);
          }
        });
        setNamePicture(fileNamePict);
        let fileUri;
        response.assets.filter((res) => {
          if (res.uri) {
            return (fileUri = res.uri);
          }
        });
        setFilePath(fileUri);
      }
    });
  };

  // console.log('namePicture =>', namePicture);
  // console.log('namePicture length =>', namePicture.length);
  // console.log('namePicture SLICE =>', namePicture.slice(49));

  return (
    <View>
      <View style={styles.continerImgPick}>
        <GeneralButton
          style={styles.btn}
          mode="outlined"
          icon={() => <ICONS.IconCamera width="20" />}
          onPress={openCamera}>
          Foto Kamera
        </GeneralButton>
        <GeneralButton
          style={styles.btn}
          mode="outlined"
          icon={() => <ICONS.IconFolder />}
          onPress={handlerUploadImages}>
          Dari Galeri
        </GeneralButton>
      </View>
      {/* {filePath === null ? (
        <View style={{width: 5, height: 5}} />
      ) : (
        <Image source={{uri: filePath}} style={{width: 100, height: 100}} />
      )} */}
      {namesPhoto === null ? (
        <View />
      ) : (
        <Text style={styles.txtPhoto} numberOfLines={1}>
          {/* {namePicture === '' ? '' : namePicture.slice(49)} */}
          {namesPhoto.slice(49)}
        </Text>
      )}
      {errorHandler && <TextError style={styles.txtErr} label={labelError} />}
    </View>
  );
};

export default BukaAkunImage;

const styles = StyleSheet.create({
  continerImgPick: {flexDirection: 'row'},
  txtPhoto: {marginTop: 8, marginBottom: -8, color: COLORS.GRAY_HARD},
  txtErr: {paddingVertical: 0},
  btn: {
    marginTop: 10,
    marginHorizontal: 4,
    borderColor: COLORS.PRIMARY_MEDIUM,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'space-between',
  },
});
