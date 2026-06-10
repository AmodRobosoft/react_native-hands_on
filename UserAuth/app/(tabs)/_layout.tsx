import { Tabs, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Header from '@/components/Header';

import CustomTabBar from '@/components/CustomTabBar';
export default function TabLayout() {

  const pathname = usePathname()
  const [title , setTitle] = useState("Home")
 
  useEffect(() => {
    const seg = pathname.split("/").filter(Boolean);
    const key = (seg[seg.length - 1] || "index").toLowerCase();
    switch (key) {
      case "cart":
        setTitle("Cart");
        break;
      case "profile": 
        setTitle("Profile");
        break;
      default:
        setTitle("Home");
    }
    
  }, [pathname]);

  return (
    <View className="flex-1 " >
      <Header title={title} showBack={false} />
      <Tabs
        
        screenOptions={{
          headerShown: false,
          
        }}

        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="Cart" options={{ title: "Cart" }} />
        <Tabs.Screen name="Profile" options={{ title: "Profile" }} />
      </Tabs>
    </View>
  );
}
