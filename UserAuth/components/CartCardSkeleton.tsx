import React from "react";
import { View } from "react-native";

const CartCardSkeleton = () => {
  return (
    <View className="flex-row w-full h-32 bg-white p-2 rounded-xl">
      {/* Thumbnail */}
      <View className="w-32 h-full bg-gray-200 rounded-xl animate-pulse" />

      <View className="flex-1 ml-4 justify-between">
        {/* Top row: title + close button */}
        <View className="flex-row justify-between items-start">
          <View className="gap-2">
            {/* Title */}
            <View className="w-32 h-4 bg-gray-200 rounded-md animate-pulse" />
            {/* Price */}
            <View className="w-16 h-3 bg-gray-200 rounded-md animate-pulse" />
          </View>
          {/* Close button */}
          <View className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
        </View>

        {/* Bottom row: discounted total + quantity control */}
        <View className="flex-row items-center gap-4">
          {/* Discounted total */}
          <View className="w-20 h-5 bg-gray-200 rounded-md animate-pulse flex-1" />

          {/* Quantity pill */}
          <View className="bg-gray-200 p-1 flex-row gap-4 items-center rounded-full animate-pulse">
            {/* Minus button */}
            <View className="w-8 h-8 bg-gray-300 rounded-full" />
            {/* Count */}
            <View className="w-4 h-4 bg-gray-300 rounded-md" />
            {/* Plus button */}
            <View className="w-8 h-8 bg-gray-300 rounded-full" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartCardSkeleton;
