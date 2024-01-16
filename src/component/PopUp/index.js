import React, {useEffect, useRef, useState} from 'react';
import {Animated, Modal, StyleSheet, View} from 'react-native';

const PopUp = (props) => {
  const {visible, children, style} = props;
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = useState(visible);
  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      setShowModal(false);
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.popUpBg}>
        <Animated.View
          style={[
            styles.popUpContainer,
            {transform: [{scale: scaleValue}]},
            style,
          ]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  popUpBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUpContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 35,
    borderRadius: 8,
    elevation: 20,
  },
});
