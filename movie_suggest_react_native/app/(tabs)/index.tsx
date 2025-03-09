import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/apis";
import { getTrendingMovie } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovie);

  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  return (
    <View className="flex-1 bg-primary">
      {/* Fixed Header with Icon and SearchBar */}
      <View className="pt-10 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0" />
        <View className="px-5">
          <Image source={icons.logo} className="w-12 h-10 mt-10 mb-5 mx-auto" />
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          />
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView className="flex-1">
        {movieLoading || trendingLoading ? (
          <ActivityIndicator />
        ) : movieError || trendingError ? (
          <Text className="text-white">
            Error:{" "}
            {movieError?.message ??
              trendingError?.message ??
              "Unable to fetch data"}
          </Text>
        ) : (
          <>
            {trendingMovies && trendingMovies.length > 0 && (
              <View className="mt-5">
                <Text className="text-lg text-white font-bold mt-5 mb-3 ml-3">
                  Trending Movies
                </Text>
                <FlatList
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard index={index} {...item} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingRight: 20,
                    paddingHorizontal: 5,
                  }}
                />
              </View>
            )}

            <FlatList
              data={movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                marginBottom: 10,
              }}
              className="mt-2 pb-32 px-1"
              scrollEnabled={false}
              ListHeaderComponent={
                <View>
                  <Text className="text-lg text-white font-bold mt-5 mb-3 ml-3">
                    Latest Movies
                  </Text>
                </View>
              }
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}
