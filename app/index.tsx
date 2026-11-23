import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import ProductCard from "@/components/ProductCard";
import {
  categories,
  fallbackProducts,
} from "@/data/products";
import { getThriftProducts } from "@/services/productService";
import type {
  ProductCategory,
  ThriftProduct,
} from "@/types/product";

export default function HomeScreen() {
  const router = useRouter();

  // PENTING:
  // products SELALU berupa array.
  const [products, setProducts] = useState<ThriftProduct[]>(
    fallbackProducts
  );

  const [selectedCategory, setSelectedCategory] =
    useState<"Semua" | ProductCategory>("Semua");

  const [searchText, setSearchText] = useState("");

  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // LOAD DATA
  // =====================================================

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getThriftProducts();

      // Pastikan hasil API benar-benar array
      if (Array.isArray(result)) {
        setProducts(result);
      } else {
        // Kalau service bermasalah, langsung pakai data lokal
        setProducts([...fallbackProducts]);

        setError(
          "Data API tidak tersedia. Menampilkan produk lokal."
        );
      }
    } catch (error) {
      console.log("Gagal mengambil data:", error);

      // JANGAN PERNAH setProducts(undefined)
      setProducts([...fallbackProducts]);

      setError(
        "API tidak dapat diakses. Menampilkan produk lokal."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD PERTAMA KALI
  // =====================================================

  useEffect(() => {
    loadProducts();
  }, []);

  // =====================================================
  // REFRESH
  // =====================================================

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError("");

      const result = await getThriftProducts();

      if (Array.isArray(result)) {
        setProducts(result);
      } else {
        setProducts([...fallbackProducts]);

        setError(
          "Data API tidak tersedia. Menampilkan produk lokal."
        );
      }
    } catch (error) {
      console.log("Refresh gagal:", error);

      setProducts([...fallbackProducts]);

      setError(
        "Refresh gagal. Menampilkan produk lokal."
      );
    } finally {
      setRefreshing(false);
    }
  };

  // =====================================================
  // FILTER
  // =====================================================

  const visibleProducts = useMemo(() => {
    // INI BAGIAN PENTING
    // Jangan langsung products.filter()
    const safeProducts: ThriftProduct[] = Array.isArray(products)
      ? products
      : fallbackProducts;

    const normalizedSearch =
      searchText.trim().toLowerCase();

    return safeProducts.filter((product) => {
      const productName =
        String(product.name ?? "").toLowerCase();

      const productCategory =
        String(product.category ?? "").toLowerCase();

      const productColor =
        String(product.color ?? "").toLowerCase();

      const matchesSearch =
        productName.includes(normalizedSearch) ||
        productCategory.includes(normalizedSearch) ||
        productColor.includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "Semua" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchText, selectedCategory]);

  // =====================================================
  // DETAIL PRODUK
  // =====================================================

  const handleProductPress = (product: ThriftProduct) => {
    router.push({
      pathname: "/product/[id]",
      params: {
        id: product.id,
      },
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading && products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#4F6F52"
        />

        <Text style={styles.loadingText}>
          Memuat produk...
        </Text>
      </View>
    );
  }

  // =====================================================
  // TAMPILAN UTAMA
  // =====================================================

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#4F6F52"]}
          />
        }

        // =================================================
        // HEADER
        // =================================================

        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={styles.logo}>
                  THRIFTING
                </Text>

                <Text style={styles.title}>
                  Temukan Fashion
                </Text>

                <Text style={styles.subtitle}>
                  Barang thrift pilihan untuk gaya kamu.
                </Text>
              </View>

              <Pressable
                style={styles.favoriteButton}
                onPress={() => router.push("/favorites")}
              >
                <Text style={styles.favoriteIcon}>
                  ♡
                </Text>
              </Pressable>
            </View>

            {/* SEARCH */}

            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>
                🔍
              </Text>

              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Cari produk..."
                placeholderTextColor="#8A918B"
                style={styles.searchInput}
              />
            </View>

            {/* KATEGORI */}

            <Text style={styles.sectionTitle}>
              Kategori
            </Text>

            <FlatList
              horizontal
              data={categories}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
              renderItem={({ item }) => {
                const isActive =
                  selectedCategory === item;

                return (
                  <Pressable
                    onPress={() =>
                      setSelectedCategory(item)
                    }
                    style={[
                      styles.categoryButton,
                      isActive &&
                        styles.categoryButtonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        isActive &&
                          styles.categoryTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              }}
            />

            {/* INFO API */}

            {error !== "" && (
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  {error}
                </Text>
              </View>
            )}

            {/* JUMLAH PRODUK */}

            <View style={styles.resultRow}>
              <Text style={styles.sectionTitle}>
                Produk Pilihan
              </Text>

              <Text style={styles.countText}>
                {visibleProducts.length} produk
              </Text>
            </View>
          </View>
        }

        // =================================================
        // PRODUCT CARD
        // =================================================

        renderItem={({ item }) => (
  <View style={styles.cardWrapper}>
    <ProductCard product={item} />
  </View>
)}

        // =================================================
        // KALAU PRODUK KOSONG
        // =================================================

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>
              🛍️
            </Text>

            <Text style={styles.emptyTitle}>
              Produk tidak ditemukan
            </Text>

            <Text style={styles.emptyText}>
              Coba cari dengan kata lain atau
              pilih kategori Semua.
            </Text>

            <Pressable
              style={styles.resetButton}
              onPress={() => {
                setSearchText("");
                setSelectedCategory("Semua");
              }}
            >
              <Text style={styles.resetText}>
                Reset Filter
              </Text>
            </Pressable>
          </View>
        }

        // =================================================
        // FOOTER
        // =================================================

        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Thrifting • Fashion lebih hemat ♻️
            </Text>
          </View>
        }
      />
    </View>
  );
}

// =======================================================
// STYLE
// =======================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F5",
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  columnWrapper: {
    justifyContent: "space-between",
  },

  cardWrapper: {
    width: "48%",
    marginBottom: 16,
  },

  header: {
    paddingTop: 25,
    paddingBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  headerText: {
    flex: 1,
  },

  logo: {
    fontSize: 12,
    fontWeight: "900",
    color: "#4F6F52",
    letterSpacing: 2,
    marginBottom: 5,
  },

  title: {
    fontSize: 27,
    fontWeight: "900",
    color: "#26382A",
  },

  subtitle: {
    fontSize: 13,
    color: "#707870",
    marginTop: 5,
  },

  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E8EDE5",
    justifyContent: "center",
    alignItems: "center",
  },

  favoriteIcon: {
    fontSize: 27,
    color: "#4F6F52",
  },

  searchBox: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#E4E8E2",
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#26382A",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#26382A",
  },

  categoryList: {
    paddingVertical: 13,
    gap: 8,
  },

  categoryButton: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: "#E8EDE5",
  },

  categoryButtonActive: {
    backgroundColor: "#4F6F52",
  },

  categoryText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#59625B",
  },

  categoryTextActive: {
    color: "#FFFFFF",
  },

  infoBox: {
    backgroundColor: "#FFF7E6",
    borderRadius: 12,
    padding: 11,
    marginBottom: 15,
  },

  infoText: {
    fontSize: 12,
    color: "#80652B",
  },

  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  countText: {
    fontSize: 12,
    color: "#8A918B",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F8F5",
  },

  loadingText: {
    marginTop: 12,
    color: "#59625B",
    fontSize: 14,
  },

  emptyContainer: {
    alignItems: "center",
    paddingVertical: 50,
  },

  emptyEmoji: {
    fontSize: 55,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#26382A",
  },

  emptyText: {
    fontSize: 13,
    color: "#737A74",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 18,
  },

  resetButton: {
    backgroundColor: "#4F6F52",
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 12,
  },

  resetText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 13,
  },

  footer: {
    alignItems: "center",
    paddingTop: 25,
  },

  footerText: {
    color: "#9AA19B",
    fontSize: 12,
  },
});