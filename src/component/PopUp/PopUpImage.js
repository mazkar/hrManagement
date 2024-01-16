import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import PopUp from '.';
import {COLORS, FONTS} from '../../../assets/theme';

const PopUpBukaAkun = ({visible, onPress, source}) => {
  const [errorInImages, setErrorInImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.width * 13) / 16);

  useEffect(() => {
    if (visible && !errorInImages) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [errorInImages, visible]);

  const handlerOnpress = () => {
    onPress();
    setErrorInImages(false);
  };

  console.log('loading', loading);
  return (
    <PopUp visible={visible} style={{height: imageHeight}}>
      <TouchableOpacity style={styles.close} onPress={handlerOnpress}>
        <Text style={styles.txt}>X</Text>
      </TouchableOpacity>
      <View>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={COLORS.PRIMARY_MEDIUM}
            style={styles.load}
          />
        ) : errorInImages ? (
          <Image
            style={styles.imgNotFound}
            source={{
              uri: 'https://i.stack.imgur.com/6M513.png',
            }}
          />
        ) : (
          <Image
            style={styles.imgReal}
            source={{
              uri: source,
            }}
            onError={({currentTarget}) => {
              currentTarget.onerror = null; // prevents looping
              if (currentTarget.onerror === null) {
                setErrorInImages(true);
              }
            }}
          />
        )}
      </View>
    </PopUp>
  );
};

export default PopUpBukaAkun;

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.GRAY_SOFT,
  },
  txt: {
    fontSize: FONTS.v15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.PRIMARY_MEDIUM,
  },
  load: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
  },
  imgNotFound: {width: '100%', height: '100%', marginTop: 10},
  imgReal: {width: '100%', height: '100%', resizeMode: 'contain'},
});
