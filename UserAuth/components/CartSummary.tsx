import React from 'react'
import { View, Text } from 'react-native';
const CartSummary = ({ cart}:any) => {
  return (
    <View className="bg-white rounded-xl">
      <View className="flex-row justify-between p-3 border-b border-gray-200">
        <Text className="text-gray-500">Total Items</Text>
        <Text className="font-semibold">{cart?.totalQuantity}</Text>
      </View>

      <View className="flex-row justify-between p-3 border-b border-gray-200">
        <Text className="text-gray-500">Products</Text>
        <Text className="font-semibold">{cart?.totalProducts}</Text>
      </View>

      <View className="flex-row justify-between p-3 border-b border-gray-200">
        <Text className="text-gray-500">Original</Text>
        <Text className="font-semibold">${cart?.total}</Text>
      </View>

      <View className="flex-row justify-between p-3 border-b border-gray-200">
        <Text className="text-gray-500">You Pay</Text>
        <Text className="font-semibold text-green-600">
          ${cart?.discountedTotal}
        </Text>
      </View>

      <View className="flex-row justify-between p-3">
        <Text className="text-gray-500">You Save</Text>
        <Text className="font-semibold text-red-400">
          ${(cart?.total - cart?.discountedTotal).toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

export default CartSummary