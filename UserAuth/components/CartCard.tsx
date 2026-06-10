import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

interface propsType { 
    item:any
}

const CartCard = ({item}:propsType) => {
  return (
    <View>
      <View className="flex-row w-full h-32 bg-white p-2 rounded-xl">
        <View className="w-32 h-full bg-gray-200 rounded-xl">
          <Image
            source={{
              uri: item.thumbnail,
            }}
            className="w-full h-full rounded-lg"
            resizeMode="contain"
          />
        </View>

        <View className="flex-1 ml-4 justify-between">
          <View className="flex-row justify-between">
            <View className="">
              <Text className="text-xl font-bold">{item.title}</Text>
              <Text className="text-xs text-gray-500">${item.price}</Text>
            </View>
            <View className="items-start">
              <AntDesign name="close" color={"#111"} />
            </View>
          </View>
          <View className="flex-row items-center">
            <Text className="font-bold text-xl flex-1">
              ${item.discountedTotal}
            </Text>
            <View className="bg-gray-200 p-1 flex-row gap-4 items-center rounded-full">
              <View className="bg-white p-2 rounded-full ">
                <AntDesign name="minus" />
              </View>
              <Text>{item.quantity}</Text>
              <View className="bg-[#111] p-2 rounded-full">
                <AntDesign name="plus" color={"#fff"} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartCard;
