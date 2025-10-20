import { COLORS } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
	fontWeight: 'bold',
	color: COLORS.white,
	textShadowColor: "rgba(0, 0, 0, 0.2)",
	textShadowOffset: { width: 1, height: 1},
	textShadowRadius: 3,
  },
  subtitle: {
	fontSize: 18,
	color: 'rgba(255, 255, 255, 0.9)',
	marginBottom: 40,
	textAlign: 'center',
  },
  card: {
	backgroundColor: COLORS.white,
	borderRadius: 20,
	padding: 30,
	width: width - 40,
	alignItems: 'center',
	shadowColor: COLORS.black,
	shadowOffset: {
		width: 0,
		height: 2
	},
	shadowOpacity: 0.25,
	shadowRadius: 3.84,
	elevation: 5,
  },
  welcome_text: {
	fontSize: 24,
	fontWeight: 'bold',
	color: COLORS.charcoal,
	marginBottom: 10,
  },
  instruction_text: {
	fontSize: 16,
	color: COLORS.dark_gray,
	marginBottom: 20,
	textAlign: 'center'
  },
  button: {
	backgroundColor: COLORS.moderate_lime,
	borderRadius: 12,
	paddingVertical: 15,
	paddingHorizontal: 30,
	width: '100%',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'row',
  },
  button_disabled: {
	opacity: 0.7,
  },
  button_text: {
	fontSize: 16,
	fontWeight: '600',
	marginLeft: 10,
	color: COLORS.white,
  },
  error_container: {
	flexDirection: 'row',
	alignItems: 'center',
	marginTop: 20,
	paddingHorizontal: 20,
	backgroundColor: COLORS.error,
	borderRadius: 8,
  },
  error_text: {
	  color: COLORS.alert,
	fontSize: 14,
	marginLeft: 8,
  },
  button_icon: {
	marginRight: 10
  },
});
