import { StyleSheet } from "react-native";

export const clothingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7f2",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
    marginBottom: 25,
  },

  logo: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#31572c",
    letterSpacing: 1,
  },

  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 3,
  },

  cartButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  welcomeCard: {
    backgroundColor: "#31572c",
    borderRadius: 18,
    padding: 20,
    marginBottom: 25,
  },

  welcomeTitle: {
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 8,
  },

  welcomeText: {
    color: "#e9f5e5",
    fontSize: 14,
    lineHeight: 21,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },

  seeAll: {
    color: "#31572c",
    fontSize: 13,
    fontWeight: "600",
  },

  productList: {
    gap: 12,
  },

  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  productIcon: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: "#e9f5e5",
    justifyContent: "center",
    alignItems: "center",
  },

  productInfo: {
    flex: 1,
    marginLeft: 12,
  },

  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },

  category: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 3,
  },

  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#31572c",
    marginTop: 5,
  },

  buyButton: {
    backgroundColor: "#31572c",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  buyButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },

  buttonPressed: {
    opacity: 0.7,
  },
});
