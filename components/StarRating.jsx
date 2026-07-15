import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

export default function StarRating({
  rating = 0,
  size = 18,
  interactive = false,
  onChange,
  style,
}) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={[styles.row, style]}>
      {stars.map((star) => {
        const filled = star <= Math.round(rating);
        const icon = filled ? "star" : "star-outline";

        if (!interactive) {
          return (
            <Ionicons
              key={star}
              name={icon}
              size={size}
              color={COLORS.rating}
              style={styles.star}
            />
          );
        }

        return (
          <TouchableOpacity
            key={star}
            onPress={() => onChange?.(star)}
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
          >
            <Ionicons
              name={icon}
              size={size}
              color={COLORS.rating}
              style={styles.star}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginRight: 2,
  },
});
