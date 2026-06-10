import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

const CardSkeleton = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={{ opacity, width: "48%" }}
      className="bg-white rounded-lg overflow-hidden gap-2 p-4 mb-4"
    >
      <View className="bg-gray-200 rounded-lg p-2">
        <View
          style={{ width: "100%", height: 140, borderRadius: 12 }}
          className="bg-gray-300"
        />
      </View>

      <View className="gap-2">
        <View className="h-4 bg-gray-300 rounded-full w-3/4 mb-2" />
        <View
          className="bg-gray-300 p-1 rounded-full flex-row justify-between items-center"
          style={{ height: 40 }}
        >
          <View className="h-3 w-12 bg-gray-400 rounded-full ml-2" />
          <View
            className="p-1 bg-gray-200 rounded-full"
            style={{ width: 34, height: 34 }}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default CardSkeleton;
