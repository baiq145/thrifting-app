import { router } from "expo-router";
import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/context/FavoritesContext";
import { colors, pageStyles, buttonStyles } from "@/styles";

export default function FavoritesScreen() {
  const { favoriteProducts } = useFavorites();

  return (
    <ScrollView style={pageStyles.page} contentContainerStyle={pageStyles.content}>
      <Text style={pageStyles.heading}>Produk favorit ♡</Text>
      <Text style={pageStyles.subheading}>Simpan barang yang kamu suka supaya gampang ditemukan lagi.</Text>
      <View style={styles.grid}>{favoriteProducts.map((product) => <ProductCard key={product.id} product={product} />)}</View>
      {favoriteProducts.length === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyEmoji}>♡</Text>
          <Text style={styles.emptyTitle}>Belum ada favorit</Text>
          <Text style={pageStyles.empty}>Tekan ikon hati pada produk untuk menyimpannya di sini.</Text>
          <Pressable style={buttonStyles.primary} onPress={() => router.replace("/")}><Text style={buttonStyles.primaryText}>Jelajahi produk</Text></Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 22 },
  emptyBox: { alignItems: "center", backgroundColor: colors.surface, borderRadius: 20, padding: 24, marginTop: 28, borderWidth: 1, borderColor: colors.border },
  emptyEmoji: { fontSize: 48, color: colors.green },
  emptyTitle: { color: colors.ink, fontWeight: "900", fontSize: 18, marginTop: 10 }
});
