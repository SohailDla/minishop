import React from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api/dummyjson";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../app/types";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductList">;

export default function ProductListScreen({ navigation }: Props) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10 }}>Loading products…</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>Error</Text>
        <Text style={{ marginTop: 6 }}>
          {error instanceof Error ? error.message : "Something went wrong"}
        </Text>
      </View>
    );
  }

  const products = data?.products ?? [];

  if (products.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>No products</Text>
        <Text style={{ marginTop: 6 }}>Empty state visible.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={products}
        keyExtractor={(p) => String(p.id)}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("ProductDetail", { id: item.id })}
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 12,
              padding: 12,
              backgroundColor: "white",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700" }}>{item.title}</Text>
            <Text numberOfLines={2} style={{ marginTop: 6, color: "#555" }}>
              {item.description}
            </Text>
            <Text style={{ marginTop: 10, fontWeight: "700" }}>€ {item.price}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
