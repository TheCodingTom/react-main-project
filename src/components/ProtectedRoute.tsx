import { ReactNode, useContext } from "react"
import { AuthContext } from "../context/AuthContext";


type ProtectedRouteType = {
    children:ReactNode
}

function ProtectedRoute({children}:ProtectedRouteType) {

    const {user} = useContext(AuthContext) // useContext always inside function
    const isAuth = user ? true : false
   
    
  return (
    <div>
        {isAuth ? children: <h2>Login to see more</h2>}
    </div>
  )
}

export default ProtectedRoute