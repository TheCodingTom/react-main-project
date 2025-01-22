import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Countries from "./pages/Countries";

// import App from './App.tsx'
// import Books from './components/Books.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  
  <Countries/>

  </StrictMode>
);
