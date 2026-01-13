import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { HomeStackParamList, TabParamList } from "./types";

import ProductListScreen from "../screens/home/ProductListScreen";
import ProductDetailScreen from "../screens/home/ProductDetailScreen";
import CartScreen from "../screens/cart/CartScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator<TabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="ProductList" component={ProductListScreen} options={{ title: "Products" }} />
      <HomeStack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: "Detail" }} />
    </HomeStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: "Home", headerShown: false }} />
        <Tab.Screen name="CartTab" component={CartScreen} options={{ title: "Cart" }} />
        <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: "Profile" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
