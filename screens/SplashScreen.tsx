/*
 * DOCU: SplashScreen - Entry animation screen that introduces the MedRemind app.
 * Handles initial logo fade-in and transitions to the login screen.
 * Last Updated At: January 18 2025
 * @author Kyle
 */

import { COLORS } from "@/constants/Colors";
import { styles } from "@/styles/SplashScreen.styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

/*
 * DOCU: SplashScreen component
 * Displays an animated logo with fade and scale transitions, then navigates to /login.
 * Uses React Native’s Animated API for smooth entrance animation.
 * Last Updated At: January 18 2025
 * @author Kyle
 */
const SplashScreen: React.FC = () => {
  /* Animation references */
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  /* Router navigation hook */
  const router = useRouter();

  /*
   * DOCU: useEffect hook for running splash animations and timed navigation
   * Runs fade-in and scale-up animations in parallel, then navigates to login after 2 seconds.
   * Cleans up timer on unmount to prevent memory leaks.
   * Last Updated At: January 18 2025
   * @author Kyle
   */
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
      router.replace("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  /*
   * DOCU: Render splash logo and app name with animated fade and scale effects
   * Last Updated At: January 18 2025
   * @author Kyle
   */
  const renderAnimatedLogo = () => (
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
  );

  /* Render main container */
  return <View style={styles.container}>{renderAnimatedLogo()}</View>;
};

export default SplashScreen;
