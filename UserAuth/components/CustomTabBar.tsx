import React from 'react'
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
const CustomTabBar = ({ state }:BottomTabBarProps) => {
    const TABS = [
      { name: "index", label: "Home", icon: "home" },
      { name: "Cart", label: "Cart", icon: "compass" },
      { name: "Profile", label: "Profile", icon: "user" },
    ] as const;

    const router = useRouter()
    const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        position: "absolute", // ✅ float over content
        bottom: insets.bottom + 12,
        left: 16,
        right: 16,
      }}
    >
      <View className="flex-row p-3 rounded-full justify-between bg-[#111] items-center">
        {TABS.map((tab, index) => {
          const isFocused = state.index === index;
          return (
            <TouchableOpacity
              className={`flex-1 flex-row items-center justify-center py-2 px-2 rounded-full gap-4 ${isFocused && "bg-white"}`}
              key={tab.name}
              onPress={() =>
                router.push(tab.name === "index" ? "/" : `/${tab.name}`)
              }
              activeOpacity={0.8}
            >
              <Feather
                name={tab.icon}
                size={20}
                color={isFocused ? "#111" : "#888"}
              />
              {isFocused && (
                <Text className={`${isFocused && "text-[#111] font-semibold"}`}>
                  {tab.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default CustomTabBar