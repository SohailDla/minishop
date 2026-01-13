import React from "react";
import { View, Text, Button } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../app/types";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductList">;

export default function ProductListScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Product List (TODO)</Text>
      <Button title="Go to detail of id=1" onPress={() => navigation.navigate("ProductDetail", { id: 1 })} />
    </View>
  );
}
