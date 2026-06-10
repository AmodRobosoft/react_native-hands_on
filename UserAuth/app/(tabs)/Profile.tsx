import { getAuthUser, logoutUser } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { profileData } = useSelector((state: RootState) => state.auth);
  const insets = useSafeAreaInsets();
  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.replace("/(Auth)/SignIn");
  };

  useEffect(() => {
    const loadProfile = async () => {  
        const accessToken = await SecureStore.getItemAsync("accessToken");
        dispatch(getAuthUser(accessToken));
    };
    loadProfile();
  }, []);

  useEffect(() => {
    if (profileData) {
      SecureStore.setItemAsync("savedProfileData", JSON.stringify(profileData));
    }
  }, [profileData]);

  if (!profileData) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-400">Loading profile...</Text>
      </View>
    );
  }

  const initials = `${profileData.firstName?.[0] ?? ""}${profileData.lastName?.[0] ?? ""}`;

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4 pt-4">
        {/* Avatar + name */}
        <View className="bg-white rounded-2xl p-4 mb-3 border border-gray-100 items-center">
          <View className="w-20 h-20 rounded-full bg-purple-100 items-center justify-center mb-3">
            <Text className="text-purple-800 text-2xl font-semibold">
              {initials}
            </Text>
          </View>
          <Text className=" font-semibold text-gray-900">
            {profileData.firstName} {profileData.lastName}
          </Text>
          <Text className=" text-gray-400 mt-1">@{profileData.username}</Text>
          <View className="mt-2 bg-purple-100 px-4 py-1 rounded-full">
            <Text className=" font-medium text-purple-800">
              {profileData.role}
            </Text>
          </View>
        </View>

        {/* Personal info */}
        <Text className=" text-gray-400 font-medium ml-1 mb-2 uppercase tracking-wide">
          Personal
        </Text>
        <View className="bg-white rounded-2xl px-4 mb-3 border border-gray-100">
          <InfoRow icon="mail" label="email" value={profileData.email} />
          <InfoRow icon="phone" label="phone" value={profileData.phone} />
          <InfoRow
            icon="calendar"
            label="birthday"
            value={profileData.birthDate}
            last
          />
        </View>

        {/* Address */}
        <Text className=" text-gray-400 font-medium ml-1 mb-2 uppercase tracking-wide">
          Address
        </Text>
        <View className="bg-white rounded-2xl px-4 mb-3 border border-gray-100">
          <InfoRow
            icon="map-pin"
            label="street"
            value={profileData.address?.address}
          />
          <InfoRow
            icon="map"
            label="city / state"
            value={`${profileData.address?.city}, ${profileData.address?.state}`}
          />
          <InfoRow
            icon="globe"
            label="country · postal"
            value={`${profileData.address?.country} · ${profileData.address?.postalCode}`}
            last
          />
        </View>

        {/* Logout */}
        <TouchableOpacity
          className="bg-black rounded-2xl p-4 items-center mt-2"
          onPress={handleLogout}
        >
          <Text className="text-white font-semibold">Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
  last = false,
}: {
  icon: string;
  label: string;
  value: string;
  last?: boolean;
}) => (
  <View
    className={`flex-row items-center gap-3 py-3 ${!last ? "border-b border-gray-100" : ""}`}
  >
    <View className="w-8 h-8 rounded-lg bg-gray-50 items-center justify-center">
      <Feather name={icon as any} size={15} color="#888" />
    </View>
    <View className="flex-1">
      <Text className=" text-gray-400">{label}</Text>
      <Text
        className=" font-medium text-gray-900 mt-0.5"
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  </View>
);

export default Profile;


