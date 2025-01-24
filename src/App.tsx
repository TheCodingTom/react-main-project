import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Countries from "./pages/Countries";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>

      <Route path="/countries" element={<Countries/>} />
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
