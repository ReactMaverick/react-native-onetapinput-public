"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = exports.screenWidth = exports.screenHeight = exports.requestSmsPermission = exports.platform = exports.colors = void 0;
var _reactNative = require("react-native");
const screenHeight = exports.screenHeight = _reactNative.Dimensions.get('window').height;
const screenWidth = exports.screenWidth = _reactNative.Dimensions.get('window').width;
const platform = exports.platform = _reactNative.Platform.OS;
const colors = exports.colors = {
  primary: '#007BFF',
  secondary: '#c717fc',
  accent: '#ff6f00',
  black: 'black',
  white: 'white',
  offWhite: '#f5f5f5',
  transparentBlack: 'rgba(0, 0, 0, 0.02)',
  grey: 'grey',
  lightGrey: '#d3d3d3',
  darkGrey: '#333',
  error: 'red',
  lightError: '#FFCCCB',
  success: 'green',
  warning: 'yellow',
  lightGreen: '#00AB41',
  reddishOrange: '#F66666',
  tealAndroid: '#009688',
  blueIos: '#007AFF'
};
const styles = exports.styles = _reactNative.StyleSheet.create({
  defaultOtpContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    // backgroundColor: 'red',
    position: 'relative'
  },
  defaultOtpBoxStyle: {
    height: 40,
    width: 40,
    borderRadius: 4,
    borderWidth: 1,
    color: colors.white,
    fontSize: 16,
    borderColor: colors.darkGrey,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  defaultOtpTextStyle: {
    color: colors.black,
    fontSize: 16
  },
  defaultCursorStyle: {
    position: 'absolute',
    backgroundColor: platform === 'ios' ? colors.blueIos : colors.tealAndroid,
    borderRadius: 2
  },
  // Resend Button
  defaultResendButtonStyle: {
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#007BFF'
  },
  defaultResendButtonTextStyle: {
    fontSize: 16,
    color: colors.white
  },
  defaultErrorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 25
  },
  defaultErrorTextStyle: {
    color: colors.error,
    fontSize: 12
  }
});
const requestSmsPermission = async () => {
  try {
    const granted = await _reactNative.PermissionsAndroid.request(_reactNative.PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, {
      title: "SMS Permission",
      message: "This app needs access to your SMS to auto-fill the OTP.",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    });
    return granted === _reactNative.PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
exports.requestSmsPermission = requestSmsPermission;
//# sourceMappingURL=utils.js.map