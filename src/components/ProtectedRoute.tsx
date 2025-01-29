import { ReactNode, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { isUserLogged } from "./utils/AuthUtility";


type ProtectedRouteType = {
    children:ReactNode
}

function ProtectedRoute({children}:ProtectedRouteType) {

    const {user} = useContext(AuthContext) // useContext always inside function
    const isAuth = isUserLogged(user)
   
    
  return (
    <div>
        {isAuth ? children: <h2>Login to see more</h2>}
    </div>
  )
}

export default ProtectedRoute