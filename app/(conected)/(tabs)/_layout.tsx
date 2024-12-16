import { Header } from "@components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@themes/useTheme";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.typography.high,
        tabBarInactiveTintColor: theme.colors.border.medium,
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: theme.fonts.family.default,
          fontSize: theme.fonts.body.small.size,
          lineHeight: theme.fonts.body.small.lineHeight,
        },
        tabBarStyle: {
          height: 60,
        },
        tabBarItemStyle: {
          marginBottom: Platform.OS === "web" ? 0 : -25,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Evénements",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              style={[{ marginBottom: -3 }]}
              color={color}
              name={focused ? "location-sharp" : "location-outline"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendrier",
          headerShown: true,
          header: ({ options }) => (
            <Header
              title={options.title}
              subtitle="Retrouvez tous vos évènements classé par ordre chronologique."
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              name={focused ? "heart" : "heart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          headerShown: true,
          header: ({ options }) => (
            <Header
              title={options.title}
              subtitle="Retrouvez toutes les informations de votre compte."
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              name={focused ? "settings" : "settings-sharp"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
