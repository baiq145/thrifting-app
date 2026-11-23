import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import {
  fallbackProducts,
  findProductById,
  formatRupiah,
  mapApiProductToThrift,
} from "@/data/products";

import { requestProducts } from "@/services/api";

import type { ThriftProduct } from "@/types/product";

import { useFavorites } from "@/context/FavoritesContext";

export default function ProductDetailScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    id?: string;
  }>();

  const productId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [product, setProduct] =
    useState<ThriftProduct | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");

      if (!productId) {
        setError("ID produk tidak ditemukan.");
        setProduct(null);
        return;
      }

      /*
       * ==================================================
       * 1. CARI DULU DI DATA LOKAL
       * ==================================================
       */
      const localProduct =
        findProductById(productId);

      if (localProduct) {
        setProduct(localProduct);
        return;
      }

      /*
       * ==================================================
       * 2. KALAU BUKAN PRODUK LOKAL,
       *    CARI KE EXTERNAL API
       * ==================================================
       */
      const response = await requestProducts();

      const apiProduct =
        response.products.find(
          (item) =>
            `API-${item.id}` === productId
        );

      if (!apiProduct) {
        setProduct(null);
        setError("Produk tidak ditemukan.");
        return;
      }

      /*
       * ==================================================
       * 3. UBAH DATA API MENJADI ThriftProduct
       *    MENGGUNAKAN INTERFACE
       * ==================================================
       */
      const mappedProduct =
        mapApiProductToThrift(apiProduct);

      if (!mappedProduct) {
        setProduct(null);
        setError(
          "Produk API bukan produk fashion."
        );
        return;
      }

      setProduct(mappedProduct);
    } catch (err) {
      console.error(
        "Gagal mengambil detail produk:",
        err
      );

      /*
       * Kalau API gagal, coba cari
       * dari fallback lokal.
       */
      const fallbackProduct =
        fallbackProducts.find(
          (item) => item.id === productId
        );

      if (fallbackProduct) {
        setProduct(fallbackProduct);
      } else {
        setProduct(null);
        setError(
          "Gagal mengambil detail produk."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /*
   * ==================================================
   * LOADING
   * ==================================================
   */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#314D38"
        />

        <Text style={styles.loadingText}>
          Mengambil detail produk...
        </Text>
      </View>
    );
  }

  /*
   * ==================================================
   * PRODUK TIDAK DITEMUKAN
   * ==================================================
   */
  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorEmoji}>
          😕
        </Text>

        <Text style={styles.errorTitle}>
          Produk tidak ditemukan
        </Text>

        <Text style={styles.errorText}>
          Produk mungkin sudah tidak tersedia
          atau data API tidak dapat diakses.
        </Text>

        <Pressable
          style={styles.backButton}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/");
            }
          }}
        >
          <Text style={styles.backButtonText}>
            Kembali
          </Text>
        </Pressable>
      </View>
    );
  }

  const favorite =
    isFavorite(product.id);

  /*
   * ==================================================
   * DETAIL PRODUK
   * ==================================================
   */
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.contentContainer
      }
    >
      {/* BACK */}
      <View style={styles.topBar}>
        <Pressable
          style={styles.backCircle}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/");
            }
          }}
        >
          <Text style={styles.backIcon}>
            ‹
          </Text>
        </Pressable>

        <Text style={styles.pageTitle}>
          Detail Produk
        </Text>

        <Pressable
          style={styles.favoriteCircle}
          onPress={() =>
            toggleFavorite(product)
          }
        >
          <Text
            style={[
              styles.favoriteIcon,
              favorite &&
                styles.favoriteActive,
            ]}
          >
            {favorite ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>

      {/* GAMBAR */}
      <View style={styles.imageContainer}>
        {product.image ? (
          <Image
            source={{
              uri: product.image,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Text style={styles.emoji}>
            {product.emoji}
          </Text>
        )}
      </View>

      {/* INFO */}
      <View style={styles.infoContainer}>
        <Text style={styles.category}>
          {product.category.toUpperCase()}
        </Text>

        <Text style={styles.name}>
          {product.name}
        </Text>

        <Text style={styles.price}>
          {formatRupiah(product.price)}
        </Text>

        {/* KONDISI */}
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {product.condition}
            </Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {product.size}
            </Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {product.color}
            </Text>
          </View>
        </View>

        {/* DESKRIPSI */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Deskripsi
          </Text>

          <Text style={styles.description}>
            {product.description}
          </Text>
        </View>

        {/* STATUS */}
        <View style={styles.availabilityBox}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  product.isAvailable
                    ? "#6E9B72"
                    : "#C96B6B",
              },
            ]}
          />

          <Text style={styles.availabilityText}>
            {product.isAvailable
              ? "Produk tersedia"
              : "Produk tidak tersedia"}
          </Text>
        </View>

        {/* TOMBOL */}
        <Pressable
          style={styles.buyButton}
          onPress={() =>
            toggleFavorite(product)
          }
        >
          <Text style={styles.buyButtonText}>
            {favorite
              ? "♥  Hapus dari Favorit"
              : "♡  Tambahkan ke Favorit"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7F2",
  },

  contentContainer: {
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    backgroundColor: "#F8F7F2",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  loadingText: {
    marginTop: 12,
    color: "#666666",
    fontSize: 14,
  },

  errorEmoji: {
    fontSize: 55,
    marginBottom: 12,
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#252525",
    marginBottom: 8,
  },

  errorText: {
    textAlign: "center",
    color: "#777777",
    lineHeight: 21,
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: "#314D38",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 14,
  },

  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12,
  },

  backCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 34,
    color: "#314D38",
    lineHeight: 36,
  },

  pageTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#252525",
  },

  favoriteCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  favoriteIcon: {
    fontSize: 23,
    color: "#777777",
  },

  favoriteActive: {
    color: "#D95C5C",
  },

  imageContainer: {
    height: 300,
    marginHorizontal: 18,
    borderRadius: 24,
    backgroundColor: "#F0EEE5",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  emoji: {
    fontSize: 120,
  },

  infoContainer: {
    paddingHorizontal: 22,
    paddingTop: 22,
  },

  category: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#78936F",
    marginBottom: 6,
  },

  name: {
    fontSize: 25,
    fontWeight: "800",
    color: "#252525",
    marginBottom: 8,
  },

  price: {
    fontSize: 22,
    fontWeight: "900",
    color: "#314D38",
    marginBottom: 15,
  },

  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  badge: {
    backgroundColor: "#E8E5DA",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 10,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#555555",
  },

  section: {
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#252525",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#666666",
  },

  availabilityBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
  },

  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 8,
  },

  availabilityText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#555555",
  },

  buyButton: {
    marginTop: 18,
    backgroundColor: "#314D38",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
  },

  buyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});