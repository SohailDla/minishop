import React from "react";
import { Button, Text, View } from "react-native";
import { useAppSelector } from "../../app/store";
import { selectSubtotal, selectTotalItems } from "../../app/store/cartSlice";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { TabParamList } from "../../app/types";

type Props = BottomTabScreenProps<TabParamList, "ProfileTab">;

export default function ProfileScreen({ navigation }: Props) {
  const totalItems = useAppSelector(selectTotalItems);
  const subtotal = useAppSelector(selectSubtotal);

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      {/* Indienen-eis: naam zichtbaar */}
      <Text style={{ fontSize: 22, fontWeight: "800", marginBottom: 16 }}>
        Sohail Dlaia
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 8 }}>
        Items in cart: {totalItems}
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        Subtotal: € {subtotal.toFixed(2)}
      </Text>

      <Button title="Go to Cart" onPress={() => navigation.navigate("CartTab")} />
    </View>
  );
}
