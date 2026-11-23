import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const pageStyles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 36 },
  heading: { color: colors.ink, fontSize: 27, fontWeight: "900" },
  subheading: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 6 },
  sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: "800", marginBottom: 12 },
  input: {
    backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1,
    borderRadius: 14, paddingHorizontal: 15, paddingVertical: 12,
    fontSize: 14, color: colors.ink
  },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 14, marginBottom: 20 },
  chip: { borderRadius: 999, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 13, paddingVertical: 8, backgroundColor: colors.surface },
  chipActive: { backgroundColor: colors.ink, borderColor: colors.ink },
  chipText: { color: colors.ink, fontSize: 12, fontWeight: "700" },
  chipTextActive: { color: "#FFFFFF" },
  empty: { textAlign: "center", color: colors.muted, paddingVertical: 30, lineHeight: 22 }
});
