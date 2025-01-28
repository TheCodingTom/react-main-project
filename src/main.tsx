import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// import App from './App.tsx'
// import Books from './components/Books.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  
  <App/>

  </StrictMode>
);
