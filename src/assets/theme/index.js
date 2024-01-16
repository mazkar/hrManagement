import { configureFonts, DefaultTheme } from "react-native-paper";
// FONTS SIZE RESPONSIVE
import { fontValue } from "../constants/ResponsiveScreen";
// ICONS TAB NAVIGATION
import IconNavigationHomeOff from "../images/svg/homeOff.svg";
import IconNavigationHomeOn from "../images/svg/homeOn.svg";
import IconNavigationUserOff from "../images/svg/userOff.svg";
import IconNavigationUserOn from "../images/svg/userOn.svg";

// ICONS PROGRESS BAR
import IconMap from "../images/svg/map.svg";
import IconBatteryOff from "../images/svg/endStepper.svg";
import IconBatteryOn from "../images/svg/endStepperOn.svg";
import IconUserOff from "../images/svg/mediaPromotionOff.svg";
import IconUserOn from "../images/svg/mediaPromotionOn.svg";
import IconCameraOff from "../images/svg/cameraIconOff.svg";
import IconCameraOn from "../images/svg/cameraIconOn.svg";
// ICONS TEXT INPUT
import IconChevronUpArrow from "../images/svg/chevronUp.svg";
import IconChevronDownArrow from "../images/svg/chevronDown.svg";
import IconCamera from "../images/svg/camera.svg";
import IconCalender from "../images/svg/calendar.svg";
import IconFolder from "../images/svg/folder.svg";
import IcoUser from "../../assets/images/svg/user.svg";
import IcoUserLeft from "../../assets/images/svg/lock.svg";
import IcoUserRight from "../../assets/images/svg/eye.svg";
// ICONS MODAL POP UP
import IconSuccesSubmitModal from "../images/svg/submitSuccesImages.svg";
// ICONS MODAL CONENCTION ERROR
import IconConnectionError from "../images/svg/connection.svg";
// Icon SureveyEmpty
import IconSurveyEmpty from "../images/svg/surveyEmpty.svg";
// ICONS OVERVIEW
import IcoPencil from "../images/svg/pencil.svg";
import IcoGalery from "../images/svg/galery.svg";
// import IcoArrow from '../images/svg/chevr';

// IMAGE
import bgLogin from "../images/svg/bgLogin.svg";
import bgProfile from "../images/svg/bgProfile.svg";

const fontConfig = {
  ios: {
    medium: {
      fontFamily: "Barlow-Medium",
      fontWeight: "500",
    },
    regular: {
      fontFamily: "Barlow-Regular",
      fontWeight: "400",
    },
    light: {
      fontFamily: "Barlow-Light",
      fontWeight: "300",
    },
    thin: {
      fontFamily: "Barlow-Thin",
      fontWeight: "100",
    },
  },
  android: {
    medium: {
      fontFamily: "Barlow-Medium",
      fontWeight: "500",
    },
    regular: {
      fontFamily: "Barlow-Regular",
      fontWeight: "400",
    },
    light: {
      fontFamily: "Barlow-Light",
      fontWeight: "300",
    },
    thin: {
      fontFamily: "Barlow-Thin",
      fontWeight: "100",
    },
  },
};

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#E4AF00",
    // background: "#F4F7FB",
    background: "#F4F7FB",
    surface: "#FFFFFF",
    accent: "#DC241F",
    error: "#FF6F6F",
    text: "#2B2F3C",
    disabled: "#848EAA",
    placeholder: "#BCC8E7",
    backdrop: "#2B2F3C50",
  },
  fonts: configureFonts(fontConfig),
};

export const COLORS = {
  PRIMARY_DARK: "#02275D",
  PRIMARY_MEDIUM: "#E4AF00",
  PRIMARY_ULTRASOFT: "#FFE9E9",

  ALERT: "#FF6F6F",
  INFO: "#FFCC00",
  SUCCESS: "#6DD13E",

  GRAY_HARD: "#848EAA",
  GRAY_MEDIUM: "#BCC8E7",
  GRAY_SOFT: "#E6EAF3",
  GRAY_ULTRASOFT: "#FFFFFF",

  DARK: "#2B2F3C",

  BLACK: "#000",

  WHITE: "#FFFFFF",
  WHITE90: "#FFFFFF90",
  WHITE80: "#FFFFFF80",
  WHITE70: "#FFFFFF70",
  WHITE50: "#FFFFFF50",

  RED_BG: "#EE1C25",

  // RGBA
  RED_TRANSPARENT: "rgba(220, 36, 31, 0.5)",
};

export const IMAGE = { bgLogin, bgProfile };

export const ICONS = {
  IconNavigationHomeOff,
  IconNavigationHomeOn,
  IconNavigationUserOff,
  IconNavigationUserOn,
  IconMap,
  IconBatteryOff,
  IconBatteryOn,
  IconUserOff,
  IconUserOn,
  IconCameraOff,
  IconCameraOn,
  IconChevronUpArrow,
  IconChevronDownArrow,
  IconCamera,
  IconCalender,
  IconFolder,
  IcoUser,
  IcoUserLeft,
  IcoUserRight,
  IconSuccesSubmitModal,
  IconConnectionError,
  IconSurveyEmpty,
  IcoPencil,
  IcoGalery,
};

export const FONTS = {
  v8: fontValue(8),
  v10: fontValue(10),
  v11: fontValue(11),
  v12: fontValue(12),
  v13: fontValue(13),
  v14: fontValue(14),
  v15: fontValue(15),
  v16: fontValue(16),
  v17: fontValue(17),
  v18: fontValue(18),
  v19: fontValue(19),
  v20: fontValue(20),
  v24: fontValue(24),
  v25: fontValue(25),
  v30: fontValue(30),
};
