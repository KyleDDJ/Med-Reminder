import { COLORS } from "@/constants/Colors";
import { styles } from "@/styles/LoginScreen.styles";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AuthScreen: React.FC = () => {
  const [has_biometric, setHasBitometric] = useState(false);
  const [is_authenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkBiometric();
  }, []);

  const checkBiometric = async () => {
    const hasHardWare = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setHasBitometric(hasHardWare && isEnrolled);
  };

  const autheticate = async () => {
    try {
      setIsAuthenticating(true);
      setError(null);

      const hasHardWare = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      if (!hasHardWare || !isEnrolled || supportedTypes.length === 0) {
        setError("Biometric authentication not available");
        return;
      }

      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage:
          hasHardWare && isEnrolled
            ? "Use face ID/TouchID"
            : "Enter your PIN to access medication",
        fallbackLabel: "Use pin",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (auth.success) {
        router.replace("/");
      } else {
        setError("Authentication Failed: Please try again.");
      }
    } catch (error) {}
  };

  return (
    <LinearGradient
      colors={[COLORS.moderate_lime_green, COLORS.lush_paradise]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.icon}>
          <Ionicons name="medical" size={80} color={COLORS.white} />
        </View>
        <Text style={styles.title}>MedRemind</Text>
        <Text style={styles.subtitle}>Your Personal Medication Reminder</Text>

        <View style={styles.card}>
          <Text style={styles.welcome_text}>Welcome Back!</Text>
          <Text style={styles.instruction_text}>
            {has_biometric
              ? "Use face ID/TouchID or PIN to access your medication"
              : "Enter your PIN to access your medications"}
          </Text>

          <TouchableOpacity
            style={[styles.button, is_authenticating && styles.button_disabled]}
            onPress={autheticate}
            disabled={is_authenticating}
          >
            <Ionicons
              name={has_biometric ? "finger-print-outline" : "keypad-outline"}
              size={24}
              color={COLORS.white}
            />
            <Text style={styles.button_text}>
              {is_authenticating
                ? "Verifying..."
                : has_biometric
                ? "Authenticate"
                : "Enter PIN"}
            </Text>
          </TouchableOpacity>

          {error && (
            <View style={styles.error_container}>
              <Ionicons
                name="alert-circle"
                size={20}
                color={COLORS.alert}
                style={styles.button_icon}
              />
              <Text style={styles.error_text}>{error}</Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default AuthScreen;
