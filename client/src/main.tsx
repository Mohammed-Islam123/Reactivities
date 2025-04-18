import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import { store, StoreContext } from "./stores/Store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router.tsx";
import "react-calendar/dist/Calendar.css";
import "react-toastify/ReactToastify.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </StrictMode>
);
