import React from "react"
import { TextInput, View, Text, TextInputProps } from "react-native";
import { Colors } from "../../config";
import styles from "./styles";

const TextField: React.FC<TextInputProps | CustomProps > 
 = ({
    errMsg,
    inputStyle = {},
    containerStyle = {},
    reference = () => {},
    onKeyPressEvent = () => {},
    ...props
}) => (
    <View style={containerStyle}>
        <TextInput
            style={[styles.inputStyle, inputStyle, { borderColor: errMsg? Colors.Danger : Colors.Primary}]}
            ref={(r) => reference(r)}
            onKeyPress={(e) => onKeyPressEvent(e.nativeEvent.key)}
            {...props}
        />
        {errMsg ?
            <Text style={styles.errMsgStyle}>{errMsg}</Text> : null}
    </View>
)


interface CustomProps {
    errMsg: String,
    containerStyle: StyleSheet,
    inputStyle: StyleSheet,
    reference: Function,
    onKeyPressEvent: Function
}

TextField.defaultProps = {
    errMsg: "",
    placeholder: "",
    returnKeyType: "default",
    underlineColorAndroid: Colors.Transparent,
    placeholderTextColor: Colors.PlaceHolder(),
    selectionColor: Colors.Primary,
    keyboardAppearance: "dark",
    onChangeText: () => { },
    inputStyle: {},
    containerStyle: {},
}

export default React.memo(TextField);
