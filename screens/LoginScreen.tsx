/*
 * DOCU: AuthScreen - Handles biometric and PIN authentication for the MedRemind app.
 * Last Updated At: January 18 2025
 * @author Kyle
 */

import { COLORS } from "@/constants/Colors";
import { styles } from "@/styles/LoginScreen.styles";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

/*
 * DOCU: AuthScreen component
 * Responsible for verifying user access via Face ID, Touch ID, or fallback PIN.
 * Uses Expo’s LocalAuthentication API to handle biometric authentication flow.
 * Last Updated At: January 18 2025
 * @author Kyle
 */
const AuthScreen: React.FC = () => {
  /* State hooks */
  const [has_biometric, setHasBiometric] = useState<boolean>(false);
  const [is_authenticating, setIsAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /* Navigation hook */
  const router = useRouter();

  /*
   * DOCU: Effect hook to check device biometric availability on mount
   * Executes once on component load.
   * Last Updated At: January 18 2025
   * @author Kyle
   */
  useEffect(() => {
    checkBiometric();
  }, []);

  /*
   * DOCU: Check if device supports biometric authentication
   * Verifies both hardware availability and user enrollment (FaceID / TouchID).
   * Updates `has_biometric` state accordingly.
   * Last Updated At: January 18 2025
   * @author Kyle
   */
  const checkBiometric = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setHasBiometric(hasHardware && isEnrolled);
  };

  /*
   * DOCU: Handle authentication process (biometric or PIN)
   * Performs security check via LocalAuthentication.
   * Navigates to home screen if successful; otherwise sets error message.
   * Last Updated At: January 18 2025
   * @author Kyle
   */
  const authenticate = async () => {
    try {
      setIsAuthenticating(true);
      setError(null);

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      if (!hasHardware || !isEnrolled || supportedTypes.length === 0) {
        setError("Biometric authentication not available");
        setIsAuthenticating(false);
        return;
      }

      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage:
          hasHardware && isEnrolled
            ? "Use Face ID / Touch ID"
            : "Enter your PIN to access medication",
        fallbackLabel: "Use PIN",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (auth.success) {
        router.replace("/");
      } else {
        setError("Authentication Failed: Please try again.");
      }
    } catch (err) {
      console.error("Authentication Error:", err);
      setError("Unexpected error occurred during authentication.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  /*
   * DOCU: Render the app logo and text branding
   * Displays the MedRemind logo and tagline.
   * Last Updated At: January 18 2025
   * @author Kyle
   */
  const renderHeader = () => (
    <>
      <View style={styles.icon}>
        <Ionicons name="medical" size={80} color={COLORS.white} />
      </View>
      <Text style={styles.title}>MedRemind</Text>
      <Text style={styles.subtitle}>Your Personal Medication Reminder</Text>
    </>
  );

  /*
   * DOCU: Render authentication card UI
   * Displays authentication prompt, action button, and any errors.
   * Last Updated At: January 18 2025
   * @author Kyle
   */
  const renderAuthCard = () => (
    <View style={styles.card}>
      <Text style={styles.welcome_text}>Welcome Back!</Text>
      <Text style={styles.instruction_text}>
        {has_biometric
          ? "Use Face ID / Touch ID or PIN to access your medication"
          : "Enter your PIN to access your medications"}
      </Text>

      {/* Action Button */}
      <TouchableOpacity
        style={[styles.button, is_authenticating && styles.button_disabled]}
        onPress={authenticate}
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

      {/* Error Feedback */}
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
  );

  /* Render main layout */
  return (
    <LinearGradient
      colors={[COLORS.moderate_lime_green, COLORS.lush_paradise]}
      style={styles.container}
    >
      <View style={styles.content}>
        {renderHeader()}
        {renderAuthCard()}
      </View>
    </LinearGradient>
  );
};

export default AuthScreen;
