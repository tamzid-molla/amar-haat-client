import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/Router";
import { FirebaseContext } from "./contexts/FirebaseContext/FirebaseContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-bgPrimary max-w-[2500px] mx-auto">
      <FirebaseContext>
        <RouterProvider router={router}></RouterProvider>
      </FirebaseContext>
    </div>
  </StrictMode>
);
