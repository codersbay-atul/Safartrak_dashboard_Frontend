import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store";
import { setupApiClient } from "./api/client";
import ToastHost from "./components/Ui/ToastHost";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Increase default cache lifetime to reduce frequent refetches across pages
      staleTime: 120_000,
      // Fewer automatic retries to avoid repeat load during transient issues
      retry: 1,
      // Avoid refetching whenever window regains focus — keep manual control
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
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
