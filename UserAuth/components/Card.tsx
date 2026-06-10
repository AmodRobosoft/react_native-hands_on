import React from "react";
import { Image, Text, View } from "react-native";
import {Feather} from "@expo/vector-icons";
interface PropsType {
    item: any; 
}

const Card = ({ item}:PropsType) => {
  return (
    <View
      className="bg-white rounded-lg overflow-hidden gap-2 p-4 mb-4"
      style={{ width: "48%" }}
    >
      <View className="bg-gray-200 rounded-lg p-2">
        <Image
          source={{ uri: item?.thumbnail }}
          style={{ width: "100%", height: 140, borderRadius: 12 }}
        />
      </View>
      <View>
        <Text className="font-bold mb-2">{item?.title}</Text>
        <View className="bg-gray-500 p-1 rounded-full flex-row justify-between items-center">
          <Text className="text-white ml-2">${item?.price}</Text>
          <View className="p-1 bg-gray-200 rounded-full">
            <Feather name="arrow-up-right" color="#000" size={24} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
