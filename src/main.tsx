import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastPosition, Toaster } from "react-hot-toast";
import { Global, css } from '@emotion/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchOnMount: "always",
      retryOnMount: false,
    },
  },
});

const globalStyles = css`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: "Pretendard JP";
  }
`;

const toastProps = {
  position: "top-center" as ToastPosition,
  options: {
    icon: null,
    style: {
      padding: "12px 16px",
      color: "#fff",
      background: "#111111",
      fontSize: "15px",
      fontWeight: "400",
      width: "320px",
    },
    duration: 3000,
    error: {
      style: {
        background: "#E05938",
      },
    },
  },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Toaster position={toastProps.position} toastOptions={toastProps.options} />
      <Global styles={globalStyles} />
      <App />
      </QueryClientProvider>
  </BrowserRouter>
);

