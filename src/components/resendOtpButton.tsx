import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./utils";

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

const ResendOTPButton: React.FC<ResendOTPButtonProps> = ({
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
    timerUnit = 'seconds',
}) => {

    const [timer, setTimer] = useState<number>(timerUnit === 'minutes' ? intervalTime * 60 : intervalTime);

    useEffect(() => {
        let interval: NodeJS.Timeout;
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

    const getTimeInMinutesOrSeconds = (time: number) => {
        if (timerUnit === 'minutes') {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            // console.log('Minutes: ', minutes, 'Seconds: ', seconds);

            return `${minutes > 0 ? minutes + ':' : ''}${seconds < 10 ? `0${seconds}` : seconds} ${minutes >= 1 ? 'minutes' : seconds > 1 ? 'seconds' : 'second'}`;
        }
        return `${time} ${time > 1 ? 'seconds' : 'second'}`;
    }

    return (
        <View
            style={mainContainerStyle}
        >
            <View
                style={{
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        if (timer === 0) {
                            setTimer(timerUnit === 'minutes' ? intervalTime * 60 : intervalTime);
                            onResendOtp && onResendOtp();
                        }
                    }}
                    style={[resendButtonStyle ?? styles.defaultResendButtonStyle,
                    timer === 0 ? { opacity: 1, pointerEvents: 'auto' } : disabledButtonStyle ?? { opacity: 0.5, pointerEvents: 'none' },
                    resendButtonColor ? { backgroundColor: resendButtonColor, borderColor: resendButtonColor } : {},
                    ]}
                >
                    <Text
                        style={[resendButtonTextStyle ?? styles.defaultResendButtonTextStyle,
                        resendButtonTextColor ? { color: resendButtonTextColor } : {}
                        ]}
                    >{resendOtpText}</Text>
                </TouchableOpacity>
            </View>

            {!hideResendText && timer > 0 && (
                <Text
                    style={resendTextStyle}
                >
                    {resendText ? resendText(timer, timerUnit) : `You can resend OTP in ${getTimeInMinutesOrSeconds(timer)}`}
                </Text>
            )}
        </View>
    )
}

export default ResendOTPButton