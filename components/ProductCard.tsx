import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import type { ThriftProduct } from "@/types/product";
import { formatRupiah } from "@/data/products";
import { useFavorites } from "@/context/FavoritesContext";

type ProductCardProps = {
  product: ThriftProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(product.id);

  const handlePress = () => {
    router.push({
      pathname: "/product/[id]",
      params: {
        id: product.id,
      },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      {/* GAMBAR PRODUK */}
      <View style={styles.imageWrapper}>
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
        </View>

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

        {/* KONDISI */}
        <View style={styles.conditionBadge}>
          <Text style={styles.conditionText}>
            {product.condition}
          </Text>
        </View>
      </View>

      {/* INFORMASI PRODUK */}
      <View style={styles.info}>
        <Text style={styles.category}>
          {product.category.toUpperCase()}
        </Text>

        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {product.name}
        </Text>

        <Text style={styles.price}>
          {formatRupiah(product.price)}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>
            {product.size}
          </Text>

          <View style={styles.dot} />

          <Text
            style={styles.metaText}
            numberOfLines={1}
          >
            {product.color}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 8,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },

  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  imageWrapper: {
    position: "relative",
  },

  imageContainer: {
    width: "100%",
    height: 130,
    backgroundColor: "#F0EEE5",
    borderRadius: 18,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  /* INI YANG TADI ERROR */
  image: {
    width: "100%",
    height: "100%",
  },

  emoji: {
    fontSize: 65,
    transform: [{ scaleX: 1.15 }],
    textAlign: "center",
  },

  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,

    width: 34,
    height: 34,

    borderRadius: 17,
    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 3,
  },

  favoriteIcon: {
    fontSize: 21,
    color: "#777777",
  },

  favoriteActive: {
    color: "#D95C5C",
  },

  conditionBadge: {
    position: "absolute",
    left: 8,
    bottom: 8,

    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 5,

    borderRadius: 10,
  },

  conditionText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#555555",
  },

  info: {
    paddingHorizontal: 4,
    paddingTop: 10,
    paddingBottom: 5,
  },

  category: {
    fontSize: 9,
    fontWeight: "800",
    color: "#78936F",
    letterSpacing: 0.8,
    marginBottom: 3,
  },

  name: {
    fontSize: 14,
    fontWeight: "700",
    color: "#252525",
    marginBottom: 5,
  },

  price: {
    fontSize: 15,
    fontWeight: "800",
    color: "#314D38",
    marginBottom: 6,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  metaText: {
    fontSize: 10,
    color: "#777777",
    flexShrink: 1,
  },

  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#AAAAAA",
    marginHorizontal: 6,
  },
});