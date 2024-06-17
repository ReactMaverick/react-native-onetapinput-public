import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./utils";
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
  const [timer, setTimer] = useState(timerUnit === 'minutes' ? intervalTime * 60 : intervalTime);
  useEffect(() => {
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
  return /*#__PURE__*/React.createElement(View, {
    style: mainContainerStyle
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => {
      if (timer === 0) {
        setTimer(timerUnit === 'minutes' ? intervalTime * 60 : intervalTime);
        onResendOtp && onResendOtp();
      }
    },
    style: [resendButtonStyle ?? styles.defaultResendButtonStyle, timer === 0 ? {
      opacity: 1,
      pointerEvents: 'auto'
    } : disabledButtonStyle ?? {
      opacity: 0.5,
      pointerEvents: 'none'
    }, resendButtonColor ? {
      backgroundColor: resendButtonColor,
      borderColor: resendButtonColor
    } : {}]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [resendButtonTextStyle ?? styles.defaultResendButtonTextStyle, resendButtonTextColor ? {
      color: resendButtonTextColor
    } : {}]
  }, resendOtpText))), !hideResendText && timer > 0 && /*#__PURE__*/React.createElement(Text, {
    style: resendTextStyle
  }, resendText ? resendText(timer, timerUnit) : `You can resend OTP in ${getTimeInMinutesOrSeconds(timer)}`));
};
export default ResendOTPButton;
//# sourceMappingURL=resendOtpButton.js.map