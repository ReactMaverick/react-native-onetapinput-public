"use strict";

import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./utils";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
      return `${minutes > 0 ? minutes + ':' : ''}${seconds < 10 ? `0${seconds}` : seconds} ${minutes >= 1 ? 'minutes' : seconds > 1 ? 'seconds' : 'second'}`;
    }
    return `${time} ${time > 1 ? 'seconds' : 'second'}`;
  };
  return /*#__PURE__*/_jsxs(View, {
    style: mainContainerStyle,
    children: [/*#__PURE__*/_jsx(View, {
      style: {
        alignItems: 'center'
      },
      children: /*#__PURE__*/_jsx(TouchableOpacity, {
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
        } : {}],
        children: /*#__PURE__*/_jsx(Text, {
          style: [resendButtonTextStyle ?? styles.defaultResendButtonTextStyle, resendButtonTextColor ? {
            color: resendButtonTextColor
          } : {}],
          children: resendOtpText
        })
      })
    }), !hideResendText && timer > 0 && /*#__PURE__*/_jsx(Text, {
      style: resendTextStyle,
      children: resendText ? resendText(timer, timerUnit) : `You can resend OTP in ${getTimeInMinutesOrSeconds(timer)}`
    })]
  });
};
export default ResendOTPButton;
//# sourceMappingURL=resendOtpButton.js.map