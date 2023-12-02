import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { SignOutUser, userStateListener } from "../firebase";
import { createContext, useState, useEffect, ReactNode } from "react";
import { AppUser } from "../../../Services/Common/Result";

interface Props {
  children?: ReactNode;
}

export const FireBaseAuthContext = createContext({
  // "User" comes from firebase auth-public.d.ts
  currentUser: {} as User | null,
  setCurrentUser: (_user: User) => {},
  signOut: () => {},
});

export const FireBaseAuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setuserData] = useState<AppUser>({} as AppUser);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = userStateListener((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, [setCurrentUser]);

  // As soon as setting the current user to null,
  // the user will be redirected to the home page.
  const signOut = () => {
    SignOutUser();
    setCurrentUser(null);
    navigate("/login");
  };

  const value = {
    currentUser,
    setCurrentUser,
    signOut,
  };

  return (
    <FireBaseAuthContext.Provider value={value}>
      {children}
    </FireBaseAuthContext.Provider>
  );
};
