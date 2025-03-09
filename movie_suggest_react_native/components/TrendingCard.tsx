import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

type TrendingCardProps = TrendingMovie & {
  index: number;
};

const TrendingCard = ({
  movie_id,
  title,
  poster_url,
  index,
}: TrendingCardProps) => {
  return (
    <Link
      href={`/movies/${movie_id}`}
      asChild
      className={`${index !== 0 ? "mx-3" : ""}`}
    >
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{
            uri: poster_url
              ? poster_url
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-9 -left-1.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text
          className="text-sm font-bold mt-2 text-light-200"
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
