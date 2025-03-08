import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./index.css";
import App from "./App/App.tsx";
import { Provider } from "jotai";
import { nexus, store } from "@providers/store";
import { BrowserRouter } from "react-router-dom";

nexus.bootstrap();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
