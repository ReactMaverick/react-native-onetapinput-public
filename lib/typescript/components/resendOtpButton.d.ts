import { TextStyle, ViewStyle } from "react-native";
import React from "react";
type ResendOTPButtonProps = {
    intervalTime?: number;
    onResendOtp?: () => void;
    resendOtpText?: string;
    resendButtonStyle?: ViewStyle;
    resendButtonColor?: string;
    resendButtonTextColor?: string;
    resendButtonTextStyle?: TextStyle;
    resendText?: (timer: number, timerUnit?: string) => string;
    resendTextStyle?: TextStyle;
    hideResendText?: boolean;
    mainContainerStyle?: ViewStyle;
    disabledButtonStyle?: ViewStyle;
    timerUnit?: 'seconds' | 'minutes';
};
declare const ResendOTPButton: React.FC<ResendOTPButtonProps>;
export default ResendOTPButton;
//# sourceMappingURL=resendOtpButton.d.ts.map