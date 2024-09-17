import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/execution" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
