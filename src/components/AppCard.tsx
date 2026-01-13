import React from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "../app/theme/useTheme";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function AppCard({ children, style }: Props) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: t.border,
          borderRadius: 14,
          padding: 14,
          backgroundColor: t.card,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
