import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type HeaderProps = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onRightPress?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
};

const Header = ({
  title,
  subtitle,
  showBack = false,
  onRightPress,
  rightIcon = "menu",
}: HeaderProps) => {
  const router = useRouter();
   const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top }} className="flex-row bg-white items-center justify-between px-4 py-4 border-b border-gray-200">
      <View className="flex-row items-center">
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} className="mr-3 p-2">
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
        )}
        <View>
          <Text className="text-lg font-semibold text-black">{title}</Text>
          {subtitle ? (
            <Text className="text-sm text-gray-500">{subtitle}</Text>
          ) : null}
        </View>
      </View>

      {onRightPress ? (
        <TouchableOpacity onPress={onRightPress} className="p-2">
          <Ionicons name={rightIcon} size={24} color="#111" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;
