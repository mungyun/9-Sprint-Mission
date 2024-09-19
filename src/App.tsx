import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsPage from "./pages/ltemsPage/ItemsPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import GlobalStyle from "./styles/GlobalStyle";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/items/:id?" element={<ItemsPage />} />
        <Route path="/additem" element={<AddItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;