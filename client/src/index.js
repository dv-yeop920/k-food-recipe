import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistStore} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { CookiesProvider } from "react-cookie";
import store from "./store/store";
import ScrollTop from "./services/scrollTop";

axios.defaults.withCredentials = true;

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store ={ store }>
        <PersistGate loading ={ null } persistor ={ persistor }>
          <BrowserRouter>
            <ScrollTop/>
            <App/>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
