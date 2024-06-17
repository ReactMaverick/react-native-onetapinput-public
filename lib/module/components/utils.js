import { Dimensions, PermissionsAndroid, Platform, StyleSheet } from "react-native";
export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;
export const platform = Platform.OS;
export const colors = {
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
export const styles = StyleSheet.create({
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
export const requestSmsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, {
      title: "SMS Permission",
      message: "This app needs access to your SMS to auto-fill the OTP.",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    });
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
//# sourceMappingURL=utils.js.map