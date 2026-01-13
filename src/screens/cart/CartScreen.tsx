import React from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  decrement,
  increment,
  removeItem,
  selectCartItems,
  selectSubtotal,
  selectTotalItems,
} from "../../app/store/cartSlice";

export default function CartScreen() {
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectTotalItems);
  const subtotal = useAppSelector(selectSubtotal);

  if (items.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>Cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "800" }}>
        Items: {totalItems}
      </Text>
      <Text style={{ marginBottom: 16 }}>
        Subtotal: € {subtotal.toFixed(2)}
      </Text>

      <FlatList
        data={items}
        keyExtractor={(i) => String(i.id)}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 12,
              padding: 12,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              {item.title}
            </Text>
            <Text>€ {item.price}</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                gap: 8,
              }}
            >
              <Button title="-" onPress={() => dispatch(decrement(item.id))} />
              <Text>{item.quantity}</Text>
              <Button title="+" onPress={() => dispatch(increment(item.id))} />
              <View style={{ flex: 1 }} />
              <Button title="Remove" onPress={() => dispatch(removeItem(item.id))} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
