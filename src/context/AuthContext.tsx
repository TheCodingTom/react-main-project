//3. define provider props type

type AuthContextProviderProps = {
  children: ReactNode;
};

//5. define context type

type AuthContextType = {
  user: User | null;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

//6. create variable with context initial value

const contextInitialValue: AuthContextType = {
  user: null,
  login: () => {
    throw Error("context not initialised");
  },
  logout: () => {
    throw Error("context not initialised");
  },
  register: () => {
    throw Error("context not initialised");
  },
};

//1. create and export the context

import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/customTypes";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext<AuthContextType>(contextInitialValue);

//2. create and export the provider: a component that contains states, functions, etc., that I want to share

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  //4. create in (or move to) the provider all states/functions you wanna share

  const [user, setUser] = useState<User | null>(null);

  const register = async (email: string, password: string) => {
    // console.log("in auth: ", email, password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed up
      const user = userCredential.user;

      console.log(user);

      // when the first user signs up this function creates automatically a users collection in the firestore database
      // after that whenever a user signs up it creates a new document in that collection with a unique id
      const docRef = doc(db, "users", user.uid) // creating a doc reference object
      await setDoc(docRef, { // add the actual data in the doc reference object
        email: email
      })
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
    }
  };

  const login = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const email = user.email;
        const id = user.uid;
        console.log("user logged in");
        console.log(user);
        if (user && email) {
          setUser({ email, id });
        } else {
          throw new Error("User info not available");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });

  };

  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const email = user.email;
        const id = user.uid;
        console.log(user);
        console.log("user logged in");
        if (user && email) {
          setUser({ email, id });
        } else {
          throw new Error("User info not available");
        }
        // ...
      } else {
        // User is signed out
        console.log("User is logged out");
        setUser(null)
      }
    });
  };

  const logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setUser(null)
    }).catch((error) => {
      // An error happened.
      throw new Error("Couldn't sign out the user")
    });
  };

  //7. include elements you wanna share in provider property value

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{ user, login, logout, register }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};
