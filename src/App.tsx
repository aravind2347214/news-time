import { createRoot } from "react-dom/client";
import Home from "./pages/Home";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Home />
  </Provider>
);
