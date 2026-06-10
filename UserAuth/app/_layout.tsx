import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import {  store } from "@/redux/store";
import Toast from "react-native-toast-message";
import "../global.css"
import * as SecureStore from "expo-secure-store";

const RootLayoutContent = () => {
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  


  useEffect(() => {
    const bootstrap = async () => {
      const saved = await SecureStore.getItemAsync("accessToken");
      
      setToken(saved);
      setIsBootstrapping(false);
      
    };
    bootstrap();
  }, []); // only runs on cold start

  if (isBootstrapping) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {token == null ? (
        <Stack.Screen name="(Auth)" options={{ animation: "none" }} />
      ) : (
        <Stack.Screen name="(tabs)" options={{ animation: "none" }} />
      )}
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutContent />
      <Toast position="top" bottomOffset={20} />
    </Provider>
  );
}
