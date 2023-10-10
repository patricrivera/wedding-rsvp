import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "@spiel-wedding/database/database";
import { FcProps } from "@spiel-wedding/types/fcProps";
import { SignInStatusContextType } from "@spiel-wedding/types/SignInStatusContext";

export const SignInStatusContext = createContext<SignInStatusContextType | undefined>(
  undefined
);

const SignInStatusProvider = (props: FcProps): JSX.Element => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsSignedIn(user !== null);
    });
  }, []);

  return (
    <SignInStatusContext.Provider value={{ isSignedIn }}>
      {props.children}
    </SignInStatusContext.Provider>
  );
};

export default SignInStatusProvider;
