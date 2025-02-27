import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@radix-ui/themes/styles.css";
import App from "./App/App.tsx";
import { Provider } from "jotai";
import { store } from "@providers/store";
import { BrowserRouter } from "react-router-dom";
import { loadConfigs } from "@rest/common.ts";

loadConfigs()
  .then(() => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </StrictMode>
    );
  })
  .catch(() => {
    createRoot(document.getElementById("root")!).render(<StrictMode>failed to load config</StrictMode>);
  });
