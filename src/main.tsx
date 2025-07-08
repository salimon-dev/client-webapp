import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./index.css";
import App from "./App/App.tsx";
import { Provider } from "jotai";
import { store } from "@providers/store";
import { BrowserRouter } from "react-router-dom";
import { loadAndValidateAuth } from "@providers/auth.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupWebsocketAuthentication, setupWebsocketConnection } from "@providers/websocket.ts";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

async function bootstrap() {
  await loadAndValidateAuth();
  await setupWebsocketConnection();
  await setupWebsocketAuthentication();
}
bootstrap();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
