"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = require("react");
var _utils = require("./utils");
const ResendOTPButton = ({
  intervalTime = 30,
  onResendOtp,
  resendOtpText = 'Resend OTP',
  resendButtonStyle,
  resendButtonColor,
  resendButtonTextColor,
  resendButtonTextStyle,
  resendText,
  resendTextStyle,
  hideResendText = false,
  mainContainerStyle,
  disabledButtonStyle,
  timerUnit = 'seconds'
}) => {
  const [timer, setTimer] = (0, _react.useState)(timerUnit === 'minutes' ? intervalTime * 60 : intervalTime);
  (0, _react.useEffect)(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer]);
  const getTimeInMinutesOrSeconds = time => {
    if (timerUnit === 'minutes') {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      // console.log('Minutes: ', minutes, 'Seconds: ', seconds);

      return `${minutes > 0 ? minutes + ':' : ''}${seconds < 10 ? `0${seconds}` : seconds} ${minutes >= 1 ? 'minutes' : seconds > 1 ? 'seconds' : 'second'}`;
    }
    return `${time} ${time > 1 ? 'seconds' : 'second'}`;
  };
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: mainContainerStyle
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    onPress: () => {
      if (timer === 0) {
        setTimer(timerUnit === 'minutes' ? intervalTime * 60 : intervalTime);
        onResendOtp && onResendOtp();
      }
    },
    style: [resendButtonStyle ?? _utils.styles.defaultResendButtonStyle, timer === 0 ? {
      opacity: 1,
      pointerEvents: 'auto'
    } : disabledButtonStyle ?? {
      opacity: 0.5,
      pointerEvents: 'none'
    }, resendButtonColor ? {
      backgroundColor: resendButtonColor,
      borderColor: resendButtonColor
    } : {}]
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: [resendButtonTextStyle ?? _utils.styles.defaultResendButtonTextStyle, resendButtonTextColor ? {
      color: resendButtonTextColor
    } : {}]
  }, resendOtpText))), !hideResendText && timer > 0 && /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: resendTextStyle
  }, resendText ? resendText(timer, timerUnit) : `You can resend OTP in ${getTimeInMinutesOrSeconds(timer)}`));
};
var _default = exports.default = ResendOTPButton;
//# sourceMappingURL=resendOtpButton.js.map