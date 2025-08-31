import React from "react";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

export default function Touch({
  children,
  activeOpacity = 0.7,
  ...props
}: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      delayPressIn={0}
      delayPressOut={0}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}
