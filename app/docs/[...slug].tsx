import { useLocalSearchParams, router } from "expo-router";
import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { colors, pageStyles, buttonStyles } from "@/styles";

export default function DocsDetailScreen() {
  const params = useLocalSearchParams<{ slug: string | string[]; topic?: string }>();
  const slug = Array.isArray(params.slug) ? params.slug.join(" / ") : params.slug ?? "dokumentasi";

  return (
    <ScrollView style={pageStyles.page} contentContainerStyle={pageStyles.content}>
      <Text style={styles.eyebrow}>CATCH-ALL ROUTE</Text>
      <Text style={pageStyles.heading}>{slug}</Text>
      {params.topic && <Text style={styles.topic}>Parameter topic: {params.topic}</Text>}
      <View style={styles.card}>
        <Text style={styles.title}>Kenapa halaman ini ada?</Text>
        <Text style={styles.text}>Route app/docs/[...slug].tsx menerima satu atau beberapa bagian route melalui useLocalSearchParams(). Ini menunjukkan dynamic/catch-all routing dari Modul 2.</Text>
        <Text style={styles.text}>Pada Modul 3, katalog Thriftig mengambil data dari External API secara asynchronous dan menampilkan hasilnya sebagai object yang memiliki interface TypeScript.</Text>
      </View>
      <Pressable style={buttonStyles.primary} onPress={() => router.back()}><Text style={buttonStyles.primaryText}>← Kembali</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  eyebrow: { color: colors.green, fontWeight: "900", fontSize: 10, letterSpacing: 1.5, marginBottom: 8 },
  topic: { color: colors.orange, fontWeight: "800", marginBottom: 14 },
  card: { backgroundColor: colors.surface, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 18, marginBottom: 16 },
  title: { color: colors.ink, fontWeight: "900", fontSize: 17, marginBottom: 8 },
  text: { color: colors.muted, fontSize: 13, lineHeight: 21, marginBottom: 12 }
});
