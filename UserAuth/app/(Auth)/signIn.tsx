
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { AuthUser } from '@/redux/slices/authSlice';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

type FormValues = {
  username: string;
  password: string;
};

const SignIn = () => {
  const router  = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const {isLoading, error,accessToken} = useSelector((state: RootState) => state.auth)
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data);
    dispatch(AuthUser({ username: data.username, password: data.password }));
  };

  useEffect(() => { 
    if (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error,
        visibilityTime: 3000,
      });
    }
  }, [error])
  
  useEffect(() => {
    if (accessToken && !isLoading) {
      Toast.show({
        type: "success",
        text1: "Welcome Back!",
        text2: "Signed in successfully",
        visibilityTime: 2000,
      });
      router.replace("/(tabs)");
    }
  }, [accessToken, isLoading,router]);

  return (
    <KeyboardAvoidingView
      className="flex-1 justify-center items-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        <View style={styles.container} className="w-full">
          <View className="w-64 h-64 p-2 mb-2 justify-center items-center">
            <Image
              source={require("../../assets/logo/EcomLogo.png")}
              className="h-full w-full object-cover"
            />
          </View>
          <Text className="text-3xl font-bold mb-4">Sign In</Text>
          <Text className="text-gray-600 text-lg mb-6">
            Welcome back! Please sign in to your account.
          </Text>

          <View className="w-full mb-4">
            <View className="w-full relative">
              <View className="absolute left-3 top-0 bottom-0 justify-center z-10">
                <Ionicons name="person-outline" size={20} color="#9CA3AF" />
              </View>
              <Controller
                control={control}
                name="username"
                rules={{
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Enter your username"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="border border-gray-300 pl-10 h-14 rounded-full placeholder:text-[#9CA3AF]"
                  />
                )}
              />
            </View>
            {errors.username && (
              <Text className="self-start text-red-500 ">
                {errors.username.message}
              </Text>
            )}
          </View>

          <View className="w-full mb-4">
            <View className="w-full relative ">
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color="#9CA3AF"
                className="absolute left-3 top-3 bottom-0 justify-center z-10"
              />
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    secureTextEntry={!showPassword}
                    autoCorrect={false}
                    className="border border-gray-300 pl-10 pr-10 h-14 rounded-full placeholder:text-[#9CA3AF]"
                  />
                )}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-0 bottom-0 justify-center z-10"
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text className="self-start text-red-500 mb-4">
                {errors.password.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className="p-4 bg-gray-950 justify-center items-center rounded-full w-full"
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity> 
          <View className="w-full">
            <View className="p-4 border-[1px] border-gray-400 rounded-full flex-row gap-4 items-center justify-center mt-6">
              <Ionicons name="logo-google" size={24} />
              <Text>Sign in with Google</Text>
            </View>
            <View className="p-4 border-[1px] border-gray-400 rounded-full flex-row gap-4 items-center justify-center mt-6">
              <Ionicons name="logo-facebook" size={24} />
              <Text>Sign in with Facebook</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { color: "#007AFF", marginTop: 16, textAlign: "center" },
});

export default SignIn;