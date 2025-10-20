import { COLORS, defaultBackground } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

const SplashScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  const router = useRouter();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Ionicons name="medical" size={100} color={COLORS.white} />
        <Text style={styles.appName}>MedRemind</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default SplashScreen;
