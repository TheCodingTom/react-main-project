import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import Countries from "./pages/Countries";
import Home from "./pages/Home";
import NoMatchPage from "./pages/NoMatchPage";
import SingleCountry from "./pages/SingleCountry";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import { CountriesContextProvider } from "./context/CountriesContext";
import Profile from "./pages/Profile";
import BackButtonThemeContainer from "./components/BackButtonThemeContainer";
import { useEffect } from "react";
import FooQuiz from "./pages/FooQuiz";

const Root = () => {
  // this route element is the parent of 3 pages, so they all contain the navbar
  return (
    // if I want to add a footer, it will go under outlet
    <>
      <NavBar />
      <BackButtonThemeContainer />
      <Outlet />
    </>
  );
};

function App() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      // API that watched for DOM changes
      document.body.style.paddingRight = "0px"; // forces to remove padding
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    }); // it watches for any changes to the style attribute of document.body and it

    return () => observer.disconnect(); // when the component unmounts, the observer stops running
  }, []);

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
                <Route path="/quiz" element={<FooQuiz />} />

                <Route
                  path="/countries/:countryName"
                  element={
                    <ProtectedRoute>
                      <SingleCountry />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NoMatchPage />} />
                {/* the "*" means that whenever the page shown is not /countries or /contact, it will show the 404page */}
              </Route>
            </Routes>
          </BrowserRouter>
        </CountriesContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
