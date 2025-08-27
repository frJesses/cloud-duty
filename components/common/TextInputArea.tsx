import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Pressable,
  Text,
} from "react-native";
import { useState, ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";

interface CustomTextInputProps extends Omit<TextInputProps, "style"> {
  placeholder?: string;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  containerStyle?: object;
  inputStyle?: object;
  isPassword?: boolean;
  isVerify?: boolean;
  maxLength?: number;
  keyboardType?: TextInputProps["keyboardType"];
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
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
  multiline = false,
  numberOfLines = 1,
  editable = true,
  onFocus,
  onBlur,
  onSubmitEditing,
  leftIcon,
  rightIcon,
  iconSize = 20,
  isVerify = false,
  ...restProps
}: CustomTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
        <View style={[styles.iconContainer, styles.leftIcon]}>{leftIcon}</View>
      )}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && !isPasswordVisible}
        maxLength={maxLength}
        keyboardType={keyboardType}
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
            paddingRight: isPassword ? 40 : rightIcon ? 40 : 12,
          },
          inputStyle,
        ]}
        {...restProps}
      />

      {isPassword && (
        <Pressable
          accessibilityRole="button"
          onPress={() => setIsPasswordVisible((prev) => !prev)}
          style={[styles.iconContainer, styles.rightIcon]}
          hitSlop={8}
        >
          <Ionicons
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={20}
            color="#999"
          />
        </Pressable>
      )}

      {isVerify && (
        <Pressable accessibilityRole="button" hitSlop={8} className="pr-2">
          <Text className="color-second text-sm">获取验证码</Text>
        </Pressable>
      )}

      {Boolean(rightIcon && !isVerify && !isPassword) && (
        <View style={[styles.iconContainer, styles.rightIcon]}>
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
