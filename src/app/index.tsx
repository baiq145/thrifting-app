import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="information-circle" size={40} color="#2563eb" />

        <Text style={styles.title}>Hello World</Text>

        <TextInput placeholder="Type here..." style={styles.input} />

        <Pressable style={styles.button}>
          <Ionicons name="hand-left" size={20} color="#FFFFFF" />

          <Text style={styles.buttonText}>Click Me</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f2fe",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#2563eb",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },

  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
