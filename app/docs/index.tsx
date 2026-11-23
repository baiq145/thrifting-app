import { router } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "@/styles";
import type { ThriftProduct } from "@/types/product";
import { useFavorites } from "@/context/FavoritesContext";
import { formatRupiah } from "@/data/products";

type ProductCardProps = {
  product: ThriftProduct;
  onPress?: () => void;
};

export default function ProductCard({
  product,
  onPress,
}: ProductCardProps) {
  const { toggleFavorite, isFavorite } =
    useFavorites();

  const favorite = isFavorite(product.id);

  function handlePress() {
    if (onPress) {
      onPress();
      return;
    }

    router.push({
      pathname: "/product/[id]",
      params: {
        id: product.id,
        name: product.name,
        category: product.category,
        price: String(product.price),
        condition: product.condition,
        size: product.size,
        color: product.color,
        description: product.description,
        emoji: product.emoji,
        isAvailable: String(product.isAvailable),
        image: product.image ?? "",
      },
    });
  }

  return (
    <Pressable
      style={styles.card}
      onPress={handlePress}
    >
      {/* GAMBAR / EMOJI */}
      <View style={styles.imageContainer}>
        {product.image ? (
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.emoji}>
            {product.emoji}
          </Text>
        )}

        {/* FAVORITE */}
        <Pressable
          style={styles.favoriteButton}
          onPress={(event) => {
            event.stopPropagation();
            toggleFavorite(product);
          }}
        >
          <Text
            style={[
              styles.favoriteIcon,
              favorite && styles.favoriteActive,
            ]}
          >
            {favorite ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>

      {/* INFO */}
      <View style={styles.info}>
        <Text
          style={styles.category}
          numberOfLines={1}
        >
          {product.category}
        </Text>

        <Text
          style={styles.name}
          numberOfLines={2}
        >
          {product.name}
        </Text>

        <Text style={styles.price}>
          {formatRupiah(product.price)}
        </Text>

        <View style={styles.detailRow}>
          <Text style={styles.detail}>
            {product.size}
          </Text>

          <Text style={styles.dot}>
            •
          </Text>

          <Text
            style={styles.detail}
            numberOfLines={1}
          >
            {product.color}
          </Text>
        </View>

       


        <View style={styles.conditionBox}>
          <Text style={styles.condition}>
            {product.condition}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },

  imageContainer: {
    height: 150,
    backgroundColor: colors.greenLight,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  emoji: {
    fontSize: 58,
  },

  favoriteButton: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  favoriteIcon: {
    fontSize: 22,
    color: colors.green,
  },

  favoriteActive: {
    color: "#C94A55",
  },

  info: {
    padding: 12,
  },

  category: {
    fontSize: 10,
    fontWeight: "900",
    color: colors.green,
    textTransform: "uppercase",
    marginBottom: 4,
  },

  name: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.ink,
    lineHeight: 18,
    minHeight: 36,
  },

  price: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.green,
    marginTop: 7,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  detail: {
    fontSize: 10,
    color: colors.muted,
  },

  dot: {
    fontSize: 10,
    color: colors.muted,
    marginHorizontal: 4,
  },

  conditionBox: {
    alignSelf: "flex-start",
    backgroundColor: colors.greenLight,
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 4,
    marginTop: 7,
  },

  condition: {
    fontSize: 9,
    fontWeight: "800",
    color: colors.green,
  },
});