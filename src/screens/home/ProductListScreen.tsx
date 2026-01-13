import React from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { HomeStackParamList } from "../../app/types";
import { fetchProducts } from "../../api/dummyjson";
import { useTheme } from "../../app/theme/useTheme";
import AppCard from "../../components/AppCard";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductList">;

export default function ProductListScreen({ navigation }: Props) {
  const t = useTheme();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: t.background }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10, color: t.text }}>Loading products…</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 16, backgroundColor: t.background }}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: t.text }}>Error</Text>
        <Text style={{ marginTop: 6, color: t.mutedText }}>
          {error instanceof Error ? error.message : "Something went wrong"}
        </Text>
      </View>
    );
  }

  const products = data?.products ?? [];

  if (products.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 16, backgroundColor: t.background }}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: t.text }}>No products</Text>
        <Text style={{ marginTop: 6, color: t.mutedText }}>Empty state visible.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: t.background }}>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => {
          if (!item) return null;
          return (
            <Pressable onPress={() => navigation.navigate("ProductDetail", { id: item.id })}>
              <AppCard>
                <Text style={{ fontSize: 16, fontWeight: "700", color: t.text }}>{item.title}</Text>
                <Text numberOfLines={2} style={{ marginTop: 6, color: t.mutedText }}>
                  {item.description}
                </Text>
                <Text style={{ marginTop: 10, fontWeight: "800", color: t.text }}>€ {item.price}</Text>
              </AppCard>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
