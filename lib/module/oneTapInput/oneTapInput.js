"use strict";

import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Animated } from "react-native";
import { getHash, startOtpListener } from "react-native-otp-verify";
import { colors, platform, requestSmsPermission, styles } from "./utils";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const OneTapInput = ({
  value,
  otpType = 'number',
  handleOtpChange,
  getFinalOtp,
  otpBoxStyle,
  otpTextStyle,
  otpBoxBorderColor,
  otpCount = 6,
  otpContainerStyle,
  getHashCode,
  blinkingCursor = true,
  blinkingCursorAnimationDuration = 500,
  cursorPosition,
  cursorColor,
  cursorWidth = 2,
  cursorHeight = 20,
  autoFocus = true,
  hiddenText = false,
  hiddenTextSymbol = '●',
  touchEffectTransparency = 0.5,
  error = false,
  errorText,
  errorTextStyle,
  errorContainerStyle
}) => {
  const [cursorOpacity] = useState(new Animated.Value(1));
  const [otp, setOtp] = useState(value ?? "");
  const otpInputRef = useRef(null);
  const handleTextChange = text => {
    let filteredText;
    if (otpType === 'number') {
      filteredText = text.replace(/[^0-9]/g, ''); // Only numbers
    } else if (otpType === 'alpha') {
      filteredText = text.replace(/[^a-zA-Z]/g, ''); // Only alphabets
    } else if (otpType === 'alphanumeric') {
      filteredText = text.replace(/[^0-9a-zA-Z]/g, ''); // Numbers and alphabets
    } else {
      filteredText = text;
    }
    setOtp(filteredText);
    handleOtpChange && handleOtpChange(filteredText);
    if (filteredText.length === otpCount) {
      otpInputRef?.current?.blur();
      getFinalOtp && getFinalOtp(filteredText);
    }
  };
  useEffect(() => {
    const listenForOTP = async () => {
      if (platform === 'android') {
        const hasPermission = await requestSmsPermission();
        if (hasPermission) {
          getHash().then(hash => {
            getHashCode && getHashCode(hash);
          });
          try {
            startOtpListener(message => {
              const regex = new RegExp(`(\\d{${otpCount}})`, 'g');
              const result = regex.exec(message);
              if (result) {
                const otp = result[1]; // Extracting the OTP from the message (6 digit OTP)
                handleTextChange(otp);
              }
            });
          } catch (error) {
            console.error('Error in listening for OTP ===>', error);
          }
        } else {
          console.warn('SMS permission denied');
        }
      }
    };
    listenForOTP();
  }, []);
  useEffect(() => {
    const blinkAnimation = Animated.loop(Animated.sequence([Animated.timing(cursorOpacity, {
      toValue: 0,
      duration: blinkingCursorAnimationDuration,
      useNativeDriver: true
    }), Animated.timing(cursorOpacity, {
      toValue: 1,
      duration: blinkingCursorAnimationDuration,
      useNativeDriver: true
    })]));

    // Start the animation only after initial render
    if (otpInputRef.current) {
      blinkAnimation.start();
    }
    return () => blinkAnimation.stop();
  }, [otp]);
  const getCursorPositionStyle = position => {
    if (position === 'left') {
      return {
        left: 2
      };
    } else if (position === 'middle') {
      return {};
    } else {
      return position;
    }
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(View, {
      style: otpContainerStyle ?? styles.defaultOtpContainerStyle,
      children: [Array(otpCount).fill(0).map((_, index) => /*#__PURE__*/_jsxs(TouchableOpacity, {
        activeOpacity: touchEffectTransparency,
        style: otpBoxStyle ?? [styles.defaultOtpBoxStyle, otpBoxBorderColor ? {
          borderColor: otpBoxBorderColor
        } : {}, error ? {
          borderColor: colors.error
        } : {}],
        onPress: () => {
          otpInputRef?.current?.focus();
        },
        children: [/*#__PURE__*/_jsx(Text, {
          style: otpTextStyle ?? styles.defaultOtpTextStyle,
          children: otp[index] && hiddenText ? hiddenTextSymbol : otp[index]
        }), blinkingCursor && index === otp.length && /*#__PURE__*/_jsx(Animated.View, {
          style: [styles.defaultCursorStyle, {
            opacity: cursorOpacity
          }, cursorPosition ? getCursorPositionStyle(cursorPosition) : {}, cursorColor ? {
            backgroundColor: cursorColor
          } : {}, {
            width: cursorWidth,
            height: cursorHeight
          }]
        })]
      }, index)), error && errorText && /*#__PURE__*/_jsx(View, {
        style: errorContainerStyle ?? styles.defaultErrorContainer,
        children: /*#__PURE__*/_jsx(Text, {
          style: [errorTextStyle ?? styles.defaultErrorTextStyle],
          children: errorText
        })
      })]
    }), /*#__PURE__*/_jsx(TextInput, {
      style: {
        height: 0,
        width: 0,
        opacity: 0
      },
      keyboardType: otpType === 'number' ? 'number-pad' : 'default',
      maxLength: otpCount,
      value: otp,
      onChangeText: handleTextChange,
      ref: otpInputRef,
      textContentType: "oneTimeCode",
      autoFocus: autoFocus
    })]
  });
};
export default OneTapInput;
//# sourceMappingURL=oneTapInput.js.map