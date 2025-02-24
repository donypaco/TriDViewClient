import { StyleSheet } from "react-native";
import theme from "../styles/theme";

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.medium,
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: theme.fonts.sizeLarge,
        fontWeight: "bold",
        color: theme.colors.text,
        marginBottom: theme.spacing.large,
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.medium,
        borderRadius: theme.borderRadius.medium,
        alignItems: "center",
    },
    buttonText: {
        fontSize: theme.fonts.sizeMedium,
        color: theme.colors.secondary,
        fontWeight: "bold",
    },
    input: {
        height: 50,
        fontSize: theme.fonts.sizeMedium,
        color: theme.colors.text,
        paddingVertical: theme.spacing.small,
        paddingHorizontal: theme.spacing.medium,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.small,
        borderWidth: 1,
        borderColor: theme.colors.muted,
        shadowColor: theme.colors.text,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    label: {
        fontSize: theme.fonts.sizeSmall,
        fontWeight: "bold",
        color: theme.colors.text,
        marginBottom: theme.spacing.small,
        letterSpacing: 1,
        textTransform: "uppercase",
    },
    dropdownText: {
        fontSize: theme.fonts.sizeMedium,
        color: theme.colors.text,
        paddingVertical: theme.spacing.small,
        paddingHorizontal: theme.spacing.medium,
    },
    buttonWrapper: {
        marginTop: theme.spacing.medium,
        alignItems: "center",
    },
});

export default globalStyles;
