import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Animated } from "react-native";
import { getHash, removeListener, startOtpListener } from "react-native-otp-verify";
import { colors, platform, requestSmsPermission, styles } from "./utils";
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
  const [cursorOpacity] = useState(new Animated.Value(1)); // Initial value for opacity: 1
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
            // console.log('Hash: ', hash);
            getHashCode && getHashCode(hash);
          });
          startOtpListener(message => {
            // console.log('SMS: ', message);
            const result = /(\d{6})/g.exec(message);
            if (result) {
              const otp = result[1]; // Extracting the OTP from the message (6 digit OTP)
              // console.log('OTP from message: ', otp);
              handleTextChange(otp);
            }
          });
        } else {
          console.log('SMS permission denied');
        }
      }
    };
    listenForOTP();
    return () => removeListener();
  }, []);
  useEffect(() => {
    const blinkAnimation = Animated.loop(Animated.sequence([Animated.timing(cursorOpacity, {
      toValue: 0,
      duration: blinkingCursorAnimationDuration,
      // Adjust blink duration as needed
      useNativeDriver: true // Optimize for performance
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: otpContainerStyle ?? styles.defaultOtpContainerStyle
  }, Array(otpCount).fill(0).map((_, index) => /*#__PURE__*/React.createElement(TouchableOpacity, {
    activeOpacity: touchEffectTransparency,
    key: index,
    style: otpBoxStyle ?? [styles.defaultOtpBoxStyle, otpBoxBorderColor ? {
      borderColor: otpBoxBorderColor
    } : {}, error ? {
      borderColor: colors.error
    } : {}],
    onPress: () => {
      otpInputRef?.current?.focus();
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: otpTextStyle ?? styles.defaultOtpTextStyle
  }, otp[index] && hiddenText ? hiddenTextSymbol : otp[index]), blinkingCursor && index === otp.length &&
  /*#__PURE__*/
  // Only show cursor at active digit
  React.createElement(Animated.View, {
    style: [styles.defaultCursorStyle, {
      opacity: cursorOpacity
    }, cursorPosition ? getCursorPositionStyle(cursorPosition) : {}, cursorColor ? {
      backgroundColor: cursorColor
    } : {}, {
      width: cursorWidth,
      height: cursorHeight
    } // Custom cursor width and height
    ]
  }))), error && errorText && /*#__PURE__*/React.createElement(View, {
    style: errorContainerStyle ?? styles.defaultErrorContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: [errorTextStyle ?? styles.defaultErrorTextStyle]
  }, errorText))), /*#__PURE__*/React.createElement(TextInput, {
    style: {
      height: 0,
      width: 0,
      opacity: 0
    } // Hidden Input
    ,
    keyboardType: otpType === 'number' ? 'number-pad' : 'default',
    maxLength: otpCount,
    value: otp,
    onChangeText: handleTextChange,
    ref: otpInputRef,
    textContentType: "oneTimeCode",
    autoFocus: autoFocus
  }));
};
export default OneTapInput;
//# sourceMappingURL=oneTapInput.js.map