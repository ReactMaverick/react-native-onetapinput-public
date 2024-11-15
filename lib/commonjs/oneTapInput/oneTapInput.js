"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeOtpVerify = require("react-native-otp-verify");
var _utils = require("./utils");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  const [cursorOpacity] = (0, _react.useState)(new _reactNative.Animated.Value(1));
  const [otp, setOtp] = (0, _react.useState)(value ?? "");
  const otpInputRef = (0, _react.useRef)(null);
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
  (0, _react.useEffect)(() => {
    const listenForOTP = async () => {
      if (_utils.platform === 'android') {
        const hasPermission = await (0, _utils.requestSmsPermission)();
        if (hasPermission) {
          (0, _reactNativeOtpVerify.getHash)().then(hash => {
            getHashCode && getHashCode(hash);
          });
          try {
            (0, _reactNativeOtpVerify.startOtpListener)(message => {
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
  (0, _react.useEffect)(() => {
    const blinkAnimation = _reactNative.Animated.loop(_reactNative.Animated.sequence([_reactNative.Animated.timing(cursorOpacity, {
      toValue: 0,
      duration: blinkingCursorAnimationDuration,
      useNativeDriver: true
    }), _reactNative.Animated.timing(cursorOpacity, {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: otpContainerStyle ?? _utils.styles.defaultOtpContainerStyle,
      children: [Array(otpCount).fill(0).map((_, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
        activeOpacity: touchEffectTransparency,
        style: otpBoxStyle ?? [_utils.styles.defaultOtpBoxStyle, otpBoxBorderColor ? {
          borderColor: otpBoxBorderColor
        } : {}, error ? {
          borderColor: _utils.colors.error
        } : {}],
        onPress: () => {
          otpInputRef?.current?.focus();
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: otpTextStyle ?? _utils.styles.defaultOtpTextStyle,
          children: otp[index] && hiddenText ? hiddenTextSymbol : otp[index]
        }), blinkingCursor && index === otp.length && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
          style: [_utils.styles.defaultCursorStyle, {
            opacity: cursorOpacity
          }, cursorPosition ? getCursorPositionStyle(cursorPosition) : {}, cursorColor ? {
            backgroundColor: cursorColor
          } : {}, {
            width: cursorWidth,
            height: cursorHeight
          }]
        })]
      }, index)), error && errorText && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: errorContainerStyle ?? _utils.styles.defaultErrorContainer,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [errorTextStyle ?? _utils.styles.defaultErrorTextStyle],
          children: errorText
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
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
var _default = exports.default = OneTapInput;
//# sourceMappingURL=oneTapInput.js.map