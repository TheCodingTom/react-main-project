import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import Countries from "./pages/Countries";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NavBar from "./components/NavBar";
import NoMatchPage from "./pages/NoMatchPage";

const Root = () => { // this route element is the parent of 3 pages, so they all contain the navbar
  return (
    <>
      <NavBar />
      <Outlet/>
    </>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route element={<Root/>}>
            <Route index element={<Home />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NoMatchPage/>}/> {/* the "*" means that whenever the page shown is not /countries or /contact, it will show the 404page */} 
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
