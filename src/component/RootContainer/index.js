import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS} from '../../assets/theme';
import styles from './styles';

function RootContainer(props) {
  const {children, isTransparent, barStyle} = props;
  return (
    <SafeAreaView
      style={isTransparent ? styles.safeArea : styles.safeAreaDefaultBg}>
      {isTransparent ? (
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={barStyle}
        />
      ) : (
        <StatusBar
          backgroundColor={
            barStyle === 'dark-content' ? COLORS.WHITE : COLORS.DARK
          }
          barStyle={barStyle}
        />
      )}
      {children}
    </SafeAreaView>
  );
}

RootContainer.propTypes = {
  isTransparent: PropTypes.bool,
  barStyle: PropTypes.string,
};
RootContainer.defaultProps = {
  isTransparent: false,
  barStyle: 'dark-content',
};

export default RootContainer;
