import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS} from '../../assets/theme';

const ColorBgContainer = props => {
  const {children, bgColor = COLORS.GRAY_HARD} = props;
  return (
    <SafeAreaView style={[styles.root, {backgroundColor: bgColor}]}>
      {children}
    </SafeAreaView>
  );
};

ColorBgContainer.propTypes = {
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string,
};
ColorBgContainer.defaultProps = {
  bgColor: COLORS.GRAY_ULTRASOFT,
};

export default ColorBgContainer;

const styles = StyleSheet.create({
  root: {flex: 1},
});
