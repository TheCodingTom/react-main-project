import { User } from "../types/customTypes";

const isUserLogged = (user: User | null | undefined): boolean => {
  return !!user;
};

export { isUserLogged };