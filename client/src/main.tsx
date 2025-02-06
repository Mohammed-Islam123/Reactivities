import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import { store, StoreContext } from "./stores/activityStore.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </StrictMode>
);
