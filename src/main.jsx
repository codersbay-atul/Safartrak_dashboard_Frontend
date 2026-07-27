import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";
import "leaflet/dist/leaflet.css";
import { store } from "./store";
import { setupApiClient } from "./api/client";
import ToastHost from "./components/Ui/ToastHost";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 2,
      refetchOnWindowFocus: true,
    },
  },
});

// Attach Bearer token from Redux auth state (set on login).
setupApiClient({
  getToken: () => store.getState().auth.accessToken ?? null,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastHost />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
