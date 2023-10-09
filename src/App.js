import "./App.css";
import Login from "./pages/Login/Login";
import GroceryItems from "./pages/GroceryItems/GroceryItems";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/groceriesItems" element={<GroceryItems />} />
      </Routes>
    </div>
  );
}

export default App;
