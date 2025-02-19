import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { isUserLogged } from "../utils/AuthUtility";
import ProtectedRoutePage from "../pages/ProtectedRoutePage";

type ProtectedRouteType = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteType) {
  const { user } = useContext(AuthContext); // useContext always inside function
  const isAuth = isUserLogged(user);

  return <div>{isAuth ? children : <ProtectedRoutePage />}</div>;
}

export default ProtectedRoute;
