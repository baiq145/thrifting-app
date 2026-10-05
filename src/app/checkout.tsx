import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Checkout() {
  return (
    <View style={styles.container}>
      {/* Tombol kembali */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#31572c" />

        <Text style={styles.backText}>Kembali</Text>
      </Pressable>

      {/* Judul */}
      <Text style={styles.title}>Checkout</Text>

      <Text style={styles.subtitle}>
        Periksa kembali produk yang ingin kamu beli.
      </Text>

      {/* Produk */}
      <View style={styles.productCard}>
        <View style={styles.productIcon}>
          <Ionicons name="shirt-outline" size={55} color="#31572c" />
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName}>Kaos Oversize</Text>

          <Text style={styles.category}>T-Shirt • Preloved</Text>

          <Text style={styles.price}>Rp 75.000</Text>
        </View>
      </View>

      {/* Alamat */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="location-outline" size={22} color="#31572c" />

          <Text style={styles.sectionTitle}>Alamat Pengiriman</Text>
        </View>

        <Text style={styles.address}>Alamat pengiriman belum ditambahkan.</Text>

        <Pressable style={styles.addressButton}>
          <Text style={styles.addressButtonText}>+ Tambah Alamat</Text>
        </Pressable>
      </View>

      {/* Pembayaran */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="card-outline" size={22} color="#31572c" />

          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
        </View>

        <View style={styles.paymentCard}>
          <Text style={styles.paymentText}>COD (Cash on Delivery)</Text>

          <Ionicons name="checkmark-circle" size={22} color="#31572c" />
        </View>
      </View>

      {/* Total */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Pembayaran</Text>

        <Text style={styles.totalPrice}>Rp 75.000</Text>
      </View>

      {/* Tombol Pesan */}
      <Pressable
        style={({ pressed }) => [
          styles.orderButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => {
          alert("Pesanan berhasil dibuat! 🎉");
        }}
      >
        <Ionicons name="bag-check-outline" size={21} color="#FFFFFF" />

        <Text style={styles.orderButtonText}>Buat Pesanan</Text>
      </Pressable>
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

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 5,
    marginBottom: 20,
  },

  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  productIcon: {
    width: 80,
    height: 80,
    borderRadius: 14,
    backgroundColor: "#e9f5e5",
    justifyContent: "center",
    alignItems: "center",
  },

  productInfo: {
    flex: 1,
    marginLeft: 15,
  },

  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },

  category: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#31572c",
    marginTop: 7,
  },

  section: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },

  address: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 12,
  },

  addressButton: {
    marginTop: 10,
  },

  addressButtonText: {
    color: "#31572c",
    fontSize: 13,
    fontWeight: "bold",
  },

  paymentCard: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f7f2",
    padding: 12,
    borderRadius: 10,
  },

  paymentText: {
    fontSize: 14,
    color: "#1f2937",
  },

  totalCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 15,
  },

  totalLabel: {
    fontSize: 15,
    color: "#6b7280",
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#31572c",
  },

  orderButton: {
    height: 50,
    backgroundColor: "#31572c",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  orderButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },

  buttonPressed: {
    opacity: 0.7,
  },
});
