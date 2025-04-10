import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./store.js";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./components/Loader.jsx";


createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<Loader/>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  // </StrictMode>
);