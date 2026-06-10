import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import CartCard from '@/components/CartCard'
import CartCardSkeleton from '@/components/CartCardSkeleton'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { userCart } from '@/redux/slices/cartSlice'
import CartSummary from '@/components/ui/CartSummary'

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { cartData, isLoading } = useSelector((state: RootState) => state.cart)

  useEffect(() => { 
    const id = SecureStore.getItem("userId")
    dispatch(userCart(id))
  }, [])
  
   const products = cartData?.carts?.[0]?.products ?? [];

  return (
    <View className="p-4">
      <View></View>
      <View>
        {isLoading ? (
          <View className="gap-3">
            {[1, 2, 3, 4].map((i) => (
              <CartCardSkeleton key={i} />
            ))}
          </View>
        ) : (
          <View className='gap-4'>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ gap: 12 }}
              renderItem={({ item }) => <CartCard item={item} />}
              ListEmptyComponent={
                <Text className="text-center text-gray-400 mt-10">
                  Your cart is empty
                </Text>
              }
            />
            <CartSummary cart={cartData?.carts?.[0]} />
          </View>
        )}
      </View>
    </View>
  );
}

export default Cart