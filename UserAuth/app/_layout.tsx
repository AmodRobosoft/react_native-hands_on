import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { Stack } from "expo-router";
import { useDispatch, useSelector, Provider } from "react-redux";
import { RootState, store } from "@/redux/store";
import { restoreToken, setLoading } from "@/redux/slices/authSlice";

const RootLayoutContent = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      const email = await SecureStore.getItemAsync("userEmail");
      if (token && email) {
        dispatch(restoreToken({ token, email }));
      } else {
        dispatch(setLoading(false));
      }
    } catch (e) {
      console.error("Error restoring token:", e);
      dispatch(setLoading(false));
    }
  };

  if (isLoading) {
    return <Stack screenOptions={{ headerShown: false }} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user == null ? (
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
    </Provider>
  );
}
