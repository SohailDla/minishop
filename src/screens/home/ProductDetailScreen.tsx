import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { HomeStackParamList } from "../../app/types";
import { fetchProductById } from "../../api/dummyjson";
import { useAppDispatch } from "../../app/store";
import { addToCart } from "../../app/store/cartSlice";
import { useTheme } from "../../app/theme/useTheme";
import AppCard from "../../components/AppCard";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ route }: Props) {
  const t = useTheme();
  const dispatch = useAppDispatch();

  const id = route.params?.id;

  if (typeof id !== "number") {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 16, backgroundColor: t.background }}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: t.text }}>Missing product id</Text>
        <Text style={{ marginTop: 6, color: t.mutedText }}>Open this screen from the product list.</Text>
      </View>
    );
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: t.background }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10, color: t.text }}>Loading product…</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 16, backgroundColor: t.background }}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: t.text }}>Error</Text>
        <Text style={{ marginTop: 6, color: t.mutedText }}>
          {error instanceof Error ? error.message : "Something went wrong"}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: t.background }}>
      <AppCard>
        <Text style={{ fontSize: 22, fontWeight: "800", color: t.text }}>{data.title}</Text>

        <Text style={{ marginTop: 10, color: t.mutedText, lineHeight: 20 }}>{data.description}</Text>

        <Text style={{ marginTop: 16, fontSize: 18, fontWeight: "800", color: t.text }}>€ {data.price}</Text>

        <View style={{ marginTop: 16 }}>
          <Pressable
            onPress={() =>
              dispatch(
                addToCart({
                  id: data.id,
                  title: data.title,
                  price: data.price,
                })
              )
            }
            style={{
              paddingVertical: 14,
              borderRadius: 10,
              alignItems: "center",
              backgroundColor: "#2196F3",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "800" }}>ADD TO CART</Text>
          </Pressable>
        </View>
      </AppCard>
    </View>
  );
}
