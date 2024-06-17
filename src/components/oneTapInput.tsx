import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Animated, ViewStyle, TextStyle } from "react-native";
import { getHash, removeListener, startOtpListener } from "react-native-otp-verify";
import { colors, platform, requestSmsPermission, styles } from "./utils";

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
    cursorPosition?: 'left' | 'middle' | { left?: number, top?: number };
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

const OneTapInput: React.FC<OneTapInputProps> = ({
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
    errorContainerStyle,
}) => {
    const [cursorOpacity] = useState(new Animated.Value(1)); // Initial value for opacity: 1
    const [otp, setOtp] = useState<string>(value ?? "");

    const otpInputRef = useRef<TextInput>(null);

    const handleTextChange = (text: string) => {
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
        const blinkAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(cursorOpacity, {
                    toValue: 0,
                    duration: blinkingCursorAnimationDuration, // Adjust blink duration as needed
                    useNativeDriver: true, // Optimize for performance
                }),
                Animated.timing(cursorOpacity, {
                    toValue: 1,
                    duration: blinkingCursorAnimationDuration,
                    useNativeDriver: true,
                }),
            ])
        );

        // Start the animation only after initial render
        if (otpInputRef.current) {
            blinkAnimation.start();
        }

        return () => blinkAnimation.stop();
    }, [otp]);

    const getCursorPositionStyle = (position: 'left' | 'middle' | { left?: number, top?: number }) => {
        if (position === 'left') {
            return { left: 2 };
        } else if (position === 'middle') {
            return {};
        } else {
            return position;
        }
    };

    return (
        <>
            <View style={otpContainerStyle ?? styles.defaultOtpContainerStyle}>

                {Array(otpCount)
                    .fill(0)
                    .map((_, index) => (
                        <TouchableOpacity
                            activeOpacity={touchEffectTransparency}
                            key={index}
                            style={otpBoxStyle ?? [
                                styles.defaultOtpBoxStyle,
                                otpBoxBorderColor ? { borderColor: otpBoxBorderColor } : {},
                                error ? { borderColor: colors.error } : {},
                            ]}
                            onPress={() => { otpInputRef?.current?.focus(); }}
                        >
                            <Text
                                style={otpTextStyle ?? styles.defaultOtpTextStyle}
                            >
                                {otp[index] && hiddenText ? hiddenTextSymbol : otp[index]}
                            </Text>
                            {blinkingCursor && index === otp.length && ( // Only show cursor at active digit
                                <Animated.View
                                    style={[
                                        styles.defaultCursorStyle,
                                        { opacity: cursorOpacity },
                                        cursorPosition ? getCursorPositionStyle(cursorPosition) : {},
                                        cursorColor ? { backgroundColor: cursorColor } : {},
                                        { width: cursorWidth, height: cursorHeight } // Custom cursor width and height
                                    ]}
                                />
                            )}
                        </TouchableOpacity>
                    ))}
                {error && errorText && (
                    <View style={errorContainerStyle ?? styles.defaultErrorContainer}>
                        <Text style={[errorTextStyle ?? styles.defaultErrorTextStyle]}>
                            {errorText}
                        </Text>
                    </View>
                )}
            </View>
            <TextInput
                style={{ height: 0, width: 0, opacity: 0 }} // Hidden Input
                keyboardType={otpType === 'number' ? 'number-pad' : 'default'}
                maxLength={otpCount}
                value={otp}
                onChangeText={handleTextChange}
                ref={otpInputRef}
                textContentType="oneTimeCode"
                autoFocus={autoFocus}
            />
        </>
    );
};

export default OneTapInput;