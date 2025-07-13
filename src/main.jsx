import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnHover
              draggable
              theme="light"
            />
        </FirebaseContext>
      </QueryClientProvider>
    </div>
  </StrictMode>
);
