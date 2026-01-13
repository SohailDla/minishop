import React from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { HomeStackParamList } from "../../app/types";
import { fetchProductById } from "../../api/dummyjson";
import { useAppDispatch } from "../../app/store";
import { addToCart } from "../../app/store/cartSlice";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ route }: Props) {
  const { id } = route.params;
  const dispatch = useAppDispatch();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10 }}>Loading product…</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>Error</Text>
        <Text style={{ marginTop: 6 }}>
          {error instanceof Error ? error.message : "Something went wrong"}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>{data.title}</Text>

      <Text style={{ marginTop: 10, color: "#555" }}>{data.description}</Text>

      <Text style={{ marginTop: 16, fontSize: 18, fontWeight: "700" }}>
        € {data.price}
      </Text>

      <View style={{ marginTop: 20 }}>
        <Button
          title="Add to cart"
          onPress={() =>
            dispatch(
              addToCart({
                id: data.id,
                title: data.title,
                price: data.price,
              })
            )
          }
        />
      </View>
    </View>
  );
}
