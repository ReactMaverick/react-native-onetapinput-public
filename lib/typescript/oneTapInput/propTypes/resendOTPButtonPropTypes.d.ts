import { TextStyle, ViewStyle } from "react-native";
export type ResendOTPButtonProps = {
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
//# sourceMappingURL=resendOTPButtonPropTypes.d.ts.map