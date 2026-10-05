import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Detail() {
  return (
    <View style={styles.container}>
      {/* Tombol kembali */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#31572c" />

        <Text style={styles.backText}>Kembali</Text>
      </Pressable>

      {/* Gambar Produk */}
      <View style={styles.productImage}>
        <Ionicons name="shirt-outline" size={100} color="#31572c" />
      </View>

      {/* Informasi Produk */}
      <View style={styles.infoCard}>
        <Text style={styles.category}>T-SHIRT</Text>

        <Text style={styles.productName}>Kaos Oversize</Text>

        <Text style={styles.price}>Rp 75.000</Text>

        <Text style={styles.description}>
          Kaos oversize preloved dengan kondisi masih bagus dan nyaman digunakan
          untuk kegiatan sehari-hari.
        </Text>

        {/* Tombol Beli Sekarang */}
        <Pressable
          onPress={() => router.push("/checkout")}
          style={({ pressed }) => [
            styles.buyButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Ionicons name="cart-outline" size={21} color="#FFFFFF" />

          <Text style={styles.buyText}>Beli Sekarang</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7f2",
    padding: 20,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 35,
    marginBottom: 20,
  },

  backText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#31572c",
  },

  productImage: {
    height: 250,
    borderRadius: 20,
    backgroundColor: "#e9f5e5",
    justifyContent: "center",
    alignItems: "center",
  },

  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },

  category: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#6b7280",
    letterSpacing: 1,
  },

  productName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 6,
  },

  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#31572c",
    marginTop: 8,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: "#6b7280",
    marginTop: 15,
  },

  buyButton: {
    height: 48,
    backgroundColor: "#31572c",
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  buyText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },

  buttonPressed: {
    opacity: 0.7,
  },
});
