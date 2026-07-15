import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../constants/theme";

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  screenPadding: {
    paddingHorizontal: SPACING.lg,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
