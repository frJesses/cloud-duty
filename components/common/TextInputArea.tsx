import { TextInput, TextInputProps, StyleSheet, View } from "react-native";
import { useState, ReactNode } from "react";

interface CustomTextInputProps extends Omit<TextInputProps, "style"> {
  placeholder?: string;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  containerStyle?: object;
  inputStyle?: object;
  isPassword?: boolean;
  maxLength?: number;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoCorrect?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftIconStyle?: object;
  rightIconStyle?: object;
  iconSize?: number;
}

export default function CustomTextInput({
  placeholder = "请输入",
  placeholderTextColor = "#999",
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  isPassword = false,
  maxLength,
  keyboardType = "default",
  autoCapitalize = "none",
  autoCorrect = false,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  onFocus,
  onBlur,
  onSubmitEditing,
  leftIcon,
  rightIcon,
  leftIconStyle,
  rightIconStyle,
  iconSize = 20,
  ...restProps
}: CustomTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: isFocused ? "#EFA100" : "#E5E5E5",
          backgroundColor: editable ? "#fff" : "#f5f5f5",
        },
        containerStyle,
      ]}
    >
      {leftIcon && (
        <View style={[styles.iconContainer, styles.leftIcon, leftIconStyle]}>
          {leftIcon}
        </View>
      )}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword}
        maxLength={maxLength}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={onSubmitEditing}
        style={[
          styles.input,
          {
            paddingLeft: leftIcon ? 40 : 12,
            paddingRight: rightIcon ? 40 : 12,
          },
          inputStyle,
        ]}
        {...restProps}
      />

      {rightIcon && (
        <View style={[styles.iconContainer, styles.rightIcon, rightIconStyle]}>
          {rightIcon}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    textAlignVertical: "center",
    color: "#333",
  },
  iconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: "100%",
    zIndex: 1,
  },
  leftIcon: {
    left: 0,
  },
  rightIcon: {
    right: 0,
  },
});
