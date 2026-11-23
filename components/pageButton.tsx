import { Pressable, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { colors } from "@/styles";

interface PageButtonProps {
  title: string;
  path: "/docs" | "/favorites" | "/";
}

export default function PageButton({ title, path }: PageButtonProps) {
  return (
    <Pressable style={styles.button} onPress={() => router.push(path)}>
      <Text style={styles.text}>{title} →</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: colors.greenLight, padding: 12, borderRadius: 12, alignItems: "center" },
  text: { color: colors.green, fontWeight: "800" }
});
