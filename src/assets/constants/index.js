import {Dimensions, PixelRatio, Platform, StatusBar} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const WINDOWS_WIDTH = Dimensions.get('window').width;
const WINDOWS_HEIGHT = Dimensions.get('window').height;
const year = new Date().getFullYear();

export default {
  APP_NAME: 'AtmBiz',
  COPYRIGHT: `Copyright ${year}`,
  TAGLINE: 'Tagline here',
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  WINDOWS_WIDTH,
  WINDOWS_HEIGHT,
};
