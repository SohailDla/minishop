import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { HomeStackParamList, TabParamList } from "./types";

import ProductListScreen from "../screens/home/ProductListScreen";
import ProductDetailScreen from "../screens/home/ProductDetailScreen";
import CartScreen from "../screens/cart/CartScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

import { useAppSelector } from "./store";
import { selectIsDark } from "./store/themeSlice";
import { useTheme } from "./theme/useTheme";

const Tab = createBottomTabNavigator<TabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  const t = useTheme();

  return (
    <HomeStack.Navigator
      screenOptions={{
        // Dit is DE belangrijke lijn: background van de native-stack scene
        contentStyle: { backgroundColor: t.background },
      }}
    >
      <HomeStack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: "Products" }}
      />
      <HomeStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Detail" }}
      />
    </HomeStack.Navigator>
  );
}

export default function AppNavigator() {
  const isDark = useAppSelector(selectIsDark);
  const t = useTheme();

  // Zorgt dat navigation ook dark/light kleurt
  const navTheme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: t.background,
          card: t.card,
          text: t.text,
          border: t.border,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: t.background,
          card: t.card,
          text: t.text,
          border: t.border,
        },
      };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={{
          // Tab scenes ook correct background
          sceneStyle: { backgroundColor: t.background },
          headerStyle: { backgroundColor: t.background },
          headerTitleStyle: { color: t.text },
          headerTintColor: t.text,
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{ title: "Home", headerShown: false }}
        />
        <Tab.Screen name="CartTab" component={CartScreen} options={{ title: "Cart" }} />
        <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: "Profile" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
