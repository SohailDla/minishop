import React from "react";
import { Button, Text, View } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import type { TabParamList } from "../../app/types";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { selectSubtotal, selectTotalItems } from "../../app/store/cartSlice";
import { selectIsDark, toggleTheme } from "../../app/store/themeSlice";
import { useTheme } from "../../app/theme/useTheme";

type Props = BottomTabScreenProps<TabParamList, "ProfileTab">;

export default function ProfileScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector(selectTotalItems);
  const subtotal = useAppSelector(selectSubtotal);
  const isDark = useAppSelector(selectIsDark);
  const t = useTheme();

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center", backgroundColor: t.background }}>
      <Text style={{ fontSize: 22, fontWeight: "800", marginBottom: 16, color: t.text }}>
        Sohail Dlaia
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 8, color: t.text }}>
        Items in cart: {totalItems}
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 20, color: t.text }}>
        Subtotal: € {subtotal.toFixed(2)}
      </Text>

      <View style={{ gap: 10 }}>
        <Button title="Go to Cart" onPress={() => navigation.navigate("CartTab")} />
        <Button
          title={isDark ? "Switch to Light" : "Switch to Dark"}
          onPress={() => dispatch(toggleTheme())}
        />
      </View>
    </View>
  );
}
