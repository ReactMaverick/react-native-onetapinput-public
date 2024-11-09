export declare const screenHeight: number;
export declare const screenWidth: number;
export declare const platform: "ios" | "android" | "windows" | "macos" | "web";
export declare const colors: {
    primary: string;
    secondary: string;
    accent: string;
    black: string;
    white: string;
    offWhite: string;
    transparentBlack: string;
    grey: string;
    lightGrey: string;
    darkGrey: string;
    error: string;
    lightError: string;
    success: string;
    warning: string;
    lightGreen: string;
    reddishOrange: string;
    tealAndroid: string;
    blueIos: string;
};
export declare const styles: {
    defaultOtpContainerStyle: {
        flexDirection: "row";
        justifyContent: "space-between";
        width: "100%";
        paddingHorizontal: number;
        paddingVertical: number;
        position: "relative";
    };
    defaultOtpBoxStyle: {
        height: number;
        width: number;
        borderRadius: number;
        borderWidth: number;
        color: string;
        fontSize: number;
        borderColor: string;
        marginHorizontal: number;
        justifyContent: "center";
        alignItems: "center";
    };
    defaultOtpTextStyle: {
        color: string;
        fontSize: number;
    };
    defaultCursorStyle: {
        position: "absolute";
        backgroundColor: string;
        borderRadius: number;
    };
    defaultResendButtonStyle: {
        backgroundColor: string;
        paddingHorizontal: number;
        paddingVertical: number;
        borderRadius: number;
        marginTop: number;
        marginBottom: number;
        marginHorizontal: number;
        alignItems: "center";
        justifyContent: "center";
        borderWidth: number;
        borderColor: string;
    };
    defaultResendButtonTextStyle: {
        fontSize: number;
        color: string;
    };
    defaultErrorContainer: {
        position: "absolute";
        bottom: number;
        left: number;
    };
    defaultErrorTextStyle: {
        color: string;
        fontSize: number;
    };
};
export declare const requestSmsPermission: () => Promise<boolean>;
//# sourceMappingURL=utils.d.ts.map