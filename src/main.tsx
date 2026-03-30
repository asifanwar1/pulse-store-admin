import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NuqsAdapter } from "nuqs/adapters/react";

import "yet-another-react-lightbox/styles.css";
import "./theme.css";

import App from "./App.tsx";
import { ApiClientProvider, ToastProvider } from "./providers";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ApiClientProvider>
            <NuqsAdapter>
                <ToastProvider>
                    <App />
                </ToastProvider>
            </NuqsAdapter>
        </ApiClientProvider>
    </StrictMode>,
);
