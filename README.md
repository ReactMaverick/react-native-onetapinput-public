# OneTapInput and ResendOTPButton Components

The OneTapInput and ResendOTPButton are custom, reusable components for React-Native applications. They are designed to handle OTP (One Time Password) input and resend OTP functionality respectively. This component utilizes the `react-native-otp-verify` component for OTP Autofill functionality.

<!-- ▶️ [View Live on Expo Snack](https://snack.expo.dev/@priyam.websadroit/react-native-formtastic?platform=android) ▶️ -->

- [Usage](#usage)
- [Reference Image](#reference-image)
- [Props](#props)
- [ResendOTPButton Props](#resendotpbutton-props)

## Usage

### Permissions: Android

Before using the OneTapInput and ResendOTPButton components on android, you need to add the following permissions in your AndroidManifest.xml file for otp verify to work:

```xml
<uses-permission android:name="android.permission.RECEIVE_SMS" />
<uses-permission android:name="android.permission.READ_SMS" />
```

### Hash Code During Development

For otp auto verify to work, you need to format the incoming sms in this way: <#> Your Otp is: 123ABC78. Use this code to log in. YOURHASHCODE <#>
You have to replace YOURHASHCODE with the hash code you are getting from getHashCode function.

### Hash Code During Production

To generate the **hash code for production**, you need to follow these steps:

1. Obtain the SHA-256 certificate fingerprints for your app. You can do this by running the following command in your terminal:

   ```bash
   keytool -list -v -keystore my-release-key.keystore
   ```

   Replace my-release-key.keystore with the path and name of your actual keystore file.

2. Once you have the SHA-256 certificate fingerprint, you can use it to generate your app's hash string. The hash string is created by concatenating your app's package name with the SHA-256 certificate, and then applying a specific algorithm to it.
   You can use an online tool like this one provided by Google to generate the hash string. You can use an online tool like [this one](https://developers.google.com/android/guides/client-auth) provided by Google to generate the hash string.

3. After generating the hash string, replace YOURHASHCODE in the SMS format with this hash string.
   Please note that the hash code for debug and release versions will be different due to the different signing keys used.

```tsx
// If you are using js/jsx instead of ts/tsx, remove the types. (i.e.: <string>, :string, type declaration/s).
import { useState } from "react";
import { OneTapInput, ResendOTPButton } from "react-native-onetapinput";

const App = () => {
  const [hash, setHash] = useState<string[]>([]);
  const [otp, setOtp] = useState<string>("");

  return (
    <>
      <OneTapInput
        getFinalOtp={(otp: string) => {
          console.log("Final OTP: ", otp);
          setOtp(otp);
        }}
        getHashCode={(hash: string[]) => {
          console.log("Hash code ===> ", hash);
          setHash(hash); // The hash to be used in the SMS receiver app format: <#> Your Otp is: 123ABC78. Use this code to log in. YOURHASHCODE <#> (You have to place the hashcode at the end of your sms)
        }}
      />
      <ResendOTPButton
        onResendOtp={() => {
          // Handle Resend OTP Logic
        }}
      />
    </>
  );
};

export default App;
```

## Reference Image

![Screenshot of OneTapInput Component](https://i.ibb.co/f9W3nSk/One-Tap-Input.png "OneTapInput Component")

## Props

The OneTapInput component accepts the following props (Important & useful props are shown first and are in bold) [All props are optional]:

- **`getHashCode`**: Function to get the hash code for the OTP message.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      getHashCode={(hash: string[]) => {
        console.log("Hash code ===> ", hash);
        setHash(hash); // The hash to be used in the SMS receiver app format: <#> Your Otp is: 123ABC78. Use this code to log in. D2GX4obkbds <#>
      }}
      //... Other Props
    />
    ```

- **`otpCount`**: Number of OTP digits.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      otpCount={4} // Default is 6
      //... Other Props
    />
    ```

- **`getFinalOtp`**: Function to get the final OTP value.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      getFinalOtp={(otp: string) => {
        console.log("Final OTP: ", otp); // You will get the final OTP here
      }}
      //... Other Props
    />
    ```

- **`value`**: Initial value of the OTP input.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      value="123456"
      //... Other Props
    />
    ```

- **`otpType`**: Type of OTP. It can be 'number', 'alpha', 'alphanumeric', or 'custom'.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      otpType="alphanumeric" // Default is number
      //... Other Props
    />
    ```

- **`handleOtpChange`**: Function to call when the OTP changes.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      handleOtpChange={(otp: string) => {
        console.log("OTP: ", otp); // You will get the changed OTP here
      }}
      //... Other Props
    />
    ```

- **`hiddenText`**: Boolean to hide/show the OTP text.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      hiddenText={true} // Default is false
      //... Other Props
    />
    ```

- **`error`**: Boolean to indicate if there is an error.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      error={true} // Default is false
      //... Other Props
    />
    ```

- **`errorText`**: Error text to display below the OTP Input component.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      errorText="Invalid OTP" // If error is true and errorText is given, this error will show below component
      //... Other Props
    />
    ```

- `otpBoxStyle`: Style object for the OTP box.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      otpBoxStyle={{
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
      //... Other Props
    />
    ```

- `otpTextStyle`: Style object for the OTP text.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      otpTextStyle={{
        fontSize: 12,
      }}
      //... Other Props
    />
    ```

- `otpBoxBorderColor`: Border color for the OTP box.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      otpBoxBorderColor="blue"
      //... Other Props
    />
    ```

- `otpContainerStyle`: Style object for the OTP container.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      otpContainerStyle={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
      }}
      //... Other Props
    />
    ```

- `blinkingCursor`: Boolean to enable/disable the blinking cursor.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      blinkingCursor={false} // Default is true
      //... Other Props
    />
    ```

- `blinkingCursorAnimationDuration`: Duration of the blinking cursor animation.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      blinkingCursorAnimationDuration={400} // Default is 500 ms
      //... Other Props
    />
    ```

- `cursorPosition`: Position of the cursor. It can be 'left', 'middle', or an object specifying the left and top positions.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      cursorPosition={"left"} // Or cursorPosition={{ left: 5, top: 5,}}
      //... Other Props
    />
    ```

- `cursorColor`: Color of the cursor.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      cursorColor="blue"
      //... Other Props
    />
    ```

- `cursorWidth`: Width of the cursor.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      cursorWidth={1} // Default is 2
      //... Other Props
    />
    ```

- `cursorHeight`: Height of the cursor.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      cursorHeight={15} // Default is 20
      //... Other Props
    />
    ```

- `autoFocus`: Boolean to enable/disable autofocus on the OTP input.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      autoFocus={false} // Default is true
      //... Other Props
    />
    ```

- `hiddenTextSymbol`: Symbol to show when the OTP text is hidden.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      hiddenTextSymbol="*" // Default is '●'
      //... Other Props
    />
    ```

- `touchEffectTransparency`: Transparency of the touch effect of OTP Box.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      touchEffectTransparency={0.2} // Default is 0.5
      //... Other Props
    />
    ```

- `errorTextStyle`: Style object for the error text.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      errorTextStyle={{
        fontSize: 16,
      }}
      //... Other Props
    />
    ```

- `errorContainerStyle`: Style object for the error container.

  - Usage:

    ```tsx
    <OneTapInput
      //.... Other Props
      errorContainerStyle={{
        position: "absolute",
        bottom: 0,
        left: 0,
      }}
      //... Other Props
    />
    ```

## ResendOTPButton Props

The ResendOTPButton component accepts the following props (Important & useful props are shown first and are in bold) [All props are optional.]:

- **`onResendOtp`**: Function to call when the resend OTP button is clicked.

  - Usage:

    ```tsx
    <ResendOTPButton
      //.... Other Props
      onResendOtp={() => {
        // Handle Resend OTP Functionality
      }}
      //... Other Props
    />
    ```

- **`intervalTime`**: Interval time for the resend OTP functionality.

  - Usage:

    ```tsx
    <ResendOTPButton
      //.... Other Props
      intervalTime={10} // Default is 30 seconds
      //... Other Props
    />
    ```

- **`timerUnit`**: Unit for the timer. It can be 'seconds' or 'minutes'.

  - Usage:

    ```tsx
    <ResendOTPButton
      //.... Other Props
      timerUnit="minutes" // Default is "seconds"
      //... Other Props
    />
    ```

- **`resendText`**: Function to format the resend text.

  - Usage:

    ```tsx
    <ResendOTPButton
      //.... Other Props
      resendText={(timer, timerUnit) =>
        `Please wait ${timer + " " + timerUnit} before resending.`
      } // You can customize the resend text here
      //... Other Props
    />
    ```

- **`resendOtpText`**: Text for the resend OTP button.

  - Usage:

    ```tsx
    <ResendOTPButton
      //.... Other Props
      resendOtpText="Send OTP Again" // Default is Resend OTP
      //... Other Props
    />
    ```

- `resendButtonStyle`: Style object for the resend OTP button.

  - Usage:

    ```tsx
    <ResendOTPButton
      //.... Other Props
      resendButtonStyle={{
        marginTop: 20,
        marginBottom: 20,
      }}
      //... Other Props
    />
    ```

- `resendButtonColor`: Color for the resend OTP button.

  - Usage:

    ```tsx
    <ResendOTPButton
      //.... Other Props
      resendButtonColor="green"
      //... Other Props
    />
    ```

- `resendButtonTextColor`: Text color for the resend OTP button.

  - Usage:

    ```tsx
    <ResendOTPButton
      //.... Other Props
      resendButtonTextColor="black"
      //... Other Props
    />
    ```

- `resendButtonTextStyle`: Style object for the resend OTP button text.

  - Usage:

    ```tsx
    <ResendOTPButton
      //.... Other Props
      resendButtonTextStyle={{
        color: "black",
        fontSize: 16,
      }}
      //... Other Props
    />
    ```

- `resendTextStyle`: Style object for the resend text.

  - Usage:

    ```tsx
    <ResendOTPButton
      //.... Other Props
      resendTextStyle={{
        fontSize: 16,
      }}
      //... Other Props
    />
    ```

- `hideResendText`: Boolean to hide/show the resend text.

  - Usage:

    ```tsx
    <ResendOTPButton
      //.... Other Props
      hideResendText={true} // Default is false
      //... Other Props
    />
    ```

- `mainContainerStyle`: Style object for the main container.

  - Usage:

    ```tsx
    <ResendOTPButton
      //.... Other Props
      mainContainerStyle={{
        position: "absolute",
      }}
      //... Other Props
    />
    ```

- `disabledButtonStyle`: Style object for the disabled resend OTP button.

  - Usage:

    ```tsx
    <ResendOTPButton
      //.... Other Props
      disabledButtonStyle={{ display: "none" }}
      //... Other Props
    />
    ```

# Changelog

All notable changes to this project will be documented here.

## [1.1.0] - 2024-06-17

### Fixed

- Imported React in the ResendOTPButton component to fix a runtime error.

## [1.0.0] - 2024-06-17

### Added

- Initial upload of the OneTapInput and ResendOTPButton components.
  - OneTapInput: A custom, reusable component for handling OTP (One Time Password) input in React-Native applications. It utilizes the `react-native-otp-verify` component for OTP Autofill functionality.
  - ResendOTPButton: A custom, reusable component for handling resend OTP functionality in React-Native applications.
  - Provided usage examples and prop descriptions in the README.

<!-- ### Changed
- N/A

### Fixed
- N/A

### Removed
- N/A

## [Unreleased]
- N/A -->
