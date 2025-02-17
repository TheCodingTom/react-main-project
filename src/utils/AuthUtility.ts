import { User } from "../types/customTypes";

const isUserLogged = (user?: User | null): boolean => { 
  return !!user;  // ensures the result is always true for truthy values and false for falsy values
};

export { isUserLogged };