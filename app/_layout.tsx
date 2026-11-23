import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

function RouteGuard() {
  const { session, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    // Halaman yang boleh dibuka tanpa login
    const isAuthRoute = pathname === "/login" || pathname === "/register";

    // Belum login → arahkan ke Login
    if (!session && !isAuthRoute) {
      router.replace("./login");
      return;
    }

    // Sudah login → tidak boleh kembali ke Login/Register
    if (session && (pathname === "/login" || pathname === "/register")) {
      router.replace("./");
    }
  }, [session, loading, pathname]);

  // Tunggu pengecekan session selesai
  if (loading) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F7F3EC",
        },
        headerTintColor: "#26382D",
        headerTitleStyle: {
          fontWeight: "800",
        },
        contentStyle: {
          backgroundColor: "#F7F3EC",
        },
        headerBackTitle: "Kembali",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Thrifting",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="register"
        options={{
          title: "Register",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="favorites"
        options={{
          title: "Produk Favorit",
        }}
      />

      <Stack.Screen
        name="product/[id]"
        options={{
          title: "Detail Produk",
        }}
      />

      <Stack.Screen
        name="docs/index"
        options={{
          title: "Panduan Thrifting",
        }}
      />

      <Stack.Screen
        name="docs/[...slug]"
        options={{
          title: "Dokumentasi",
        }}
      />

      <Stack.Screen
        name="data"
        options={{
          title: "data pengguna",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <StatusBar style="dark" />
        <RouteGuard />
      </FavoritesProvider>
    </AuthProvider>
  );
}
