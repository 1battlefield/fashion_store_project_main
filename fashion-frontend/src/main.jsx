import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

// Thiết lập địa chỉ backend mặc định cho tất cả các lệnh gọi axios
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
