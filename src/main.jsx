import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/Router";
import { FirebaseContext } from "./contexts/FirebaseContext/FirebaseContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-bgPrimary max-w-[2500px] mx-auto">
      <QueryClientProvider client={queryClient}>
        <FirebaseContext>
          <RouterProvider router={router}></RouterProvider>
        </FirebaseContext>
      </QueryClientProvider>
    </div>
  </StrictMode>
);
