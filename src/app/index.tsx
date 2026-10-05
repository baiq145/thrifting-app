import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { clothingStyles as styles } from "@/constants/clothingStyles";

// Tipe data produk
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  icon: keyof typeof Ionicons.glyphMap;
}

// Array of Objects
const products: Product[] = [
  {
    id: 1,
    name: "Kaos Oversize",
    category: "T-Shirt",
    price: 75000,
    icon: "shirt-outline",
  },
  {
    id: 2,
    name: "Hoodie Vintage",
    category: "Hoodie",
    price: 120000,
    icon: "shirt-outline",
  },
  {
    id: 3,
    name: "Jeans Cargo",
    category: "Celana",
    price: 150000,
    icon: "shirt-outline",
  },
];

// Custom Function
function formatPrice(price: number): string {
  return "Rp " + price.toLocaleString("id-ID");
}

// Komponen kartu produk
function ProductCard({ product }: { product: Product }) {
  return (
    <View style={styles.productCard}>
      <View style={styles.productIcon}>
        <Ionicons name={product.icon} size={45} color="#31572c" />
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>

        <Text style={styles.category}>{product.category}</Text>

        <Text style={styles.price}>{formatPrice(product.price)}</Text>
      </View>

      <Pressable
        onPress={() => router.push("/detail")}
        style={({ pressed }) => [
          styles.buyButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Ionicons name="cart-outline" size={20} color="#FFFFFF" />

        <Text style={styles.buyButtonText}>Lihat</Text>
      </Pressable>
    </View>
  );
}

export default function Index() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>CLOTHING</Text>

          <Text style={styles.subtitle}>Preloved fashion, lebih mudah.</Text>
        </View>

        <Pressable style={styles.cartButton}>
          <Ionicons name="cart-outline" size={25} color="#31572c" />
        </Pressable>
      </View>

      {/* Welcome */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Temukan Style Kamu 👕</Text>

        <Text style={styles.welcomeText}>
          Belanja fashion preloved berkualitas tanpa harus datang langsung ke
          tempat thrift.
        </Text>
      </View>

      {/* Section Produk */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Produk Terbaru</Text>

        <Text style={styles.seeAll}>Lihat semua</Text>
      </View>

      {/* Loop Array Produk */}
      <View style={styles.productList}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>

      {/* Inline Style */}
      <Text
        style={{
          textAlign: "center",
          marginTop: 20,
          fontSize: 13,
          color: "#6b7280",
        }}
      >
        ♻️ Fashion lebih hemat, lebih ramah lingkungan
      </Text>
    </View>
  );
}
