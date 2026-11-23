import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const buttonStyles = StyleSheet.create({
  primary: { backgroundColor: colors.green, borderRadius: 13, paddingVertical: 13, paddingHorizontal: 16, alignItems: "center", justifyContent: "center" },
  primaryText: { color: "#FFFFFF", fontWeight: "800", fontSize: 14 },
  secondary: { backgroundColor: colors.greenLight, borderRadius: 13, paddingVertical: 12, paddingHorizontal: 15, alignItems: "center" },
  secondaryText: { color: colors.green, fontWeight: "800", fontSize: 13 }
});

