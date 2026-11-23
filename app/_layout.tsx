import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#F7F3EC" },
          headerTintColor: "#26382D",
          headerTitleStyle: { fontWeight: "800" },
          contentStyle: { backgroundColor: "#F7F3EC" },
          headerBackTitle: "Kembali"

          
        }}
      >
        <Stack.Screen name="index" options={{ title: "Thrifting", headerShown: false }} />
        <Stack.Screen name="favorites" options={{ title: "Produk Favorit" }} />
        <Stack.Screen name="product/[id]" options={{ title: "Detail Produk" }} />
        <Stack.Screen name="docs/index" options={{ title: "Panduan Thrifting" }} />
        <Stack.Screen name="docs/[...slug]" options={{ title: "Dokumentasi" }} />
        <Stack.Screen name="data" options={{ title: "data pengguna" }} />
      </Stack>
    </FavoritesProvider>
  );
}
