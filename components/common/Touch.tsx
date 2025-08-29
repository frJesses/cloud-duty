import React from "react";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

export default function Touch({ children, ...props }: TouchableOpacityProps) {
  return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
}
