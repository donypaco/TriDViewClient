import { StyleSheet } from "react-native";

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
        borderWidth: 1,
        borderColor: theme.colors.muted,
        borderRadius: theme.borderRadius.small,
        padding: theme.spacing.small,
        fontSize: theme.fonts.sizeMedium,
    },
});

export default globalStyles;
