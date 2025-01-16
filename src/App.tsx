import { createRoot } from "react-dom/client";
import Home from "./pages/Home/Home";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router";
import  Search  from "./pages/Search/Search";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/search" element={<Search/>}/>
    </Routes>
    </BrowserRouter>
  </Provider>
);
