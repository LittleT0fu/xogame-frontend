import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ToastWrapper from "./components/ToastWrapper.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ToastWrapper>
            <App />
        </ToastWrapper>
    </StrictMode>
);
