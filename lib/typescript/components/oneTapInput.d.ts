import React from "react";
import { ViewStyle, TextStyle } from "react-native";
type OneTapInputProps = {
    value?: string;
    otpType?: 'number' | 'alpha' | 'alphanumeric' | 'custom';
    handleOtpChange?: (otp: string) => void;
    getFinalOtp?: (otp: string) => void;
    otpBoxStyle?: ViewStyle;
    otpTextStyle?: TextStyle;
    otpBoxBorderColor?: string;
    otpCount?: number;
    otpContainerStyle?: ViewStyle;
    getHashCode?: (hash: string[]) => void;
    blinkingCursor?: boolean;
    blinkingCursorAnimationDuration?: number;
    cursorPosition?: 'left' | 'middle' | {
        left?: number;
        top?: number;
    };
    cursorColor?: string;
    cursorWidth?: number;
    cursorHeight?: number;
    autoFocus?: boolean;
    hiddenText?: boolean;
    hiddenTextSymbol?: string;
    touchEffectTransparency?: number;
    error?: boolean;
    errorText?: string;
    errorTextStyle?: TextStyle;
    errorContainerStyle?: ViewStyle;
};
declare const OneTapInput: React.FC<OneTapInputProps>;
export default OneTapInput;
//# sourceMappingURL=oneTapInput.d.ts.map