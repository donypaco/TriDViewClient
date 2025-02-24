import React from "react";
import FillingForm from "../components/FillingForm";
import { API_URLS } from "../constants/urls";

export default function SignupScreen() {
    const fields = [
        { name: "email", label: "Email", placeholder: "Enter your email", type: "text", required: true },
        { name: "password", label: "Password", placeholder: "Enter your password", type: "email", required: true },
        { name: "username", label: "Username", placeholder: "Username", type: "text", required: true },
    ];

    return (
        <FillingForm fields={fields} endpoint={API_URLS.USER_SIGNUP} />
    );
}