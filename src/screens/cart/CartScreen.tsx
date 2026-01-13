import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  decrement,
  increment,
  removeItem,
  selectCartItems,
  selectSubtotal,
  selectTotalItems,
} from "../../app/store/cartSlice";
import { useTheme } from "../../app/theme/useTheme";
import AppCard from "../../components/AppCard";

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const t = useTheme();

  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectTotalItems);
  const subtotal = useAppSelector(selectSubtotal);

  if (items.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: t.background }}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: t.text }}>Cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: t.background }}>
      <Text style={{ fontSize: 18, fontWeight: "800", color: t.text }}>Items: {totalItems}</Text>
      <Text style={{ marginBottom: 16, color: t.text }}>Subtotal: € {subtotal.toFixed(2)}</Text>

      <FlatList
        data={items}
        keyExtractor={(i) => String(i.id)}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <AppCard>
            <Text style={{ fontSize: 16, fontWeight: "700", color: t.text }}>{item.title}</Text>
            <Text style={{ color: t.mutedText }}>€ {item.price}</Text>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12, gap: 10 }}>
              <Pressable
                onPress={() => dispatch(decrement(item.id))}
                style={{ paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, backgroundColor: "#2196F3" }}
              >
                <Text style={{ color: "#fff", fontWeight: "800" }}>-</Text>
              </Pressable>

              <Text style={{ color: t.text, minWidth: 22, textAlign: "center", fontWeight: "800" }}>
                {item.quantity}
              </Text>

              <Pressable
                onPress={() => dispatch(increment(item.id))}
                style={{ paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, backgroundColor: "#2196F3" }}
              >
                <Text style={{ color: "#fff", fontWeight: "800" }}>+</Text>
              </Pressable>

              <View style={{ flex: 1 }} />

              <Pressable
                onPress={() => dispatch(removeItem(item.id))}
                style={{ paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, backgroundColor: "#2196F3" }}
              >
                <Text style={{ color: "#fff", fontWeight: "800" }}>REMOVE</Text>
              </Pressable>
            </View>
          </AppCard>
        )}
      />
    </View>
  );
}
