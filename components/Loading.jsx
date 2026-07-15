import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { COLORS, FONT_SIZES, SPACING } from "../constants/theme";

export default function Loading({ message = "Loading..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      {message ? <Text style={styles.text}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  text: {
    marginTop: SPACING.sm,
    color: COLORS.gray,
    fontSize: FONT_SIZES.md,
  },
});
