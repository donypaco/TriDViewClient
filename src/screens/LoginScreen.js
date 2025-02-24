import React from "react";
import FillingForm from "../components/FillingForm";
import { API_URLS } from "../constants/urls";

export default function LoginScreen() {
    const fields = [
        { name: "email", label: "Email", placeholder: "Enter your email", type: "text", required: true },
        { name: "password", label: "Password", placeholder: "Enter your password", type: "text", required: true },
    ];

    return (
        <FillingForm fields={fields} endpoint={API_URLS.USER_LOGIN} />
    );
}