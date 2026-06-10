import Card from "@/components/Card";
import CardSkeleton from "@/components/CardSkeleton";
import { getAllProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useRef } from "react";
import { View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const SKELETON_COUNT = 6;

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allProducts, isLoading, currentPage, hasMore, pageSize } =
    useSelector((state: RootState) => state.products);

  const onEndReachedCalledDuringMomentum = useRef(false);
  const isFirstLoad = allProducts.length === 0 && isLoading;

  useEffect(() => {
    dispatch(getAllProducts({ page: 1, limit: pageSize }));
  }, [dispatch, pageSize]);

  const loadMore = () => {
    if (!isLoading && hasMore && !onEndReachedCalledDuringMomentum.current) {
      dispatch(
        getAllProducts({ page: (currentPage || 0) + 1, limit: pageSize }),
      );
      onEndReachedCalledDuringMomentum.current = true;
    }
  };

  if (isFirstLoad) {
    return (
      <View className="flex-1 px-4">
        <View className="mt-2 flex-row flex-wrap justify-between">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 px-4">
      <FlatList
        className="mt-2"
        data={allProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card item={item} />}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        bounces={false}
        overScrollMode="never"
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        ListFooterComponent={
          isLoading && !isFirstLoad ? (
            <View className="flex-row flex-wrap justify-between">
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Index;
