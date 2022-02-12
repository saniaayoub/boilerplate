import React from "react"
import { Text, TextInput, View, TextInputProps } from "react-native";
import { Colors, Metrix } from "../../config";
import styles from "./styles";

const TextArea : React.FC<TextInputProps | CustomProps > 
= ({ 
    errMsg, 
    containerStyle, 
    inputStyle, 
    reference = () => {}, 
    onKeyPressEvent = () => {}, 
    ...props 
}) => (
    <View style={containerStyle}>
        <TextInput
            style={[{ ...styles.inputStyle, height: Metrix.VerticalSize(150), textAlignVertical: "top" }, inputStyle]}
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

TextArea.defaultProps = {
    placeholder: "",
    returnKeyType: "default",
    underlineColorAndroid: Colors.Transparent,
    placeholderTextColor: Colors.PlaceHolder(),
    selectionColor: Colors.Primary,
    keyboardAppearance: "dark",
    multiline: true,
    onChangeText: () => { },
    inputStyle: {},
    containerStyle: {},
}
 

export default React.memo(TextArea);
