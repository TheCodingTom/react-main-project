import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import Countries from "./pages/Countries";
import Home from "./pages/Home";
import NoMatchPage from "./pages/NoMatchPage";
import SingleCountry from "./pages/SingleCountry";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeContext } from "./context/ThemeContext";

import { useContext } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./components/Chat";
import NavBar from "./components/NavBar";
import { CountriesContextProvider } from "./context/CountriesContext";

const Root = () => {
  // this route element is the parent of 3 pages, so they all contain the navbar
  return (
    // if I want to add a footer, it will go under outlet
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

function App() {
  // console.log(app);
  // console.log(auth);
  // console.log(db);
  const { darkMode } = useContext(ThemeContext);
  return (
    <>
      <AuthContextProvider>
        <CountriesContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" />
              <Route element={<Root />}>
                <Route index element={<Home />} />
                <Route path="/countries" element={<Countries />} />

                <Route
                  path="/countries/:countryName"
                  element={
                    <ProtectedRoute>
                      <SingleCountry />
                    </ProtectedRoute>
                  }
                />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chat" element={<Chat />} />

                <Route path="*" element={<NoMatchPage />} />
                {/* the "*" means that whenever the page shown is not /countries or /contact, it will show the 404page */}
              </Route>
            </Routes>
          </BrowserRouter>
        </CountriesContextProvider>
        {/* <ThemeContextProvider> */}
        {/* <div className={darkMode ? "dark-mode" : "light-mode"}> */}

        {/* </div> */}
        {/* </ThemeContextProvider> */}
      </AuthContextProvider>
    </>
  );
}

export default App;
