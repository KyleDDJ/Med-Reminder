import { COLORS, defaultBackground } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
  },
  appName: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    letterSpacing: 1,
  },
});
