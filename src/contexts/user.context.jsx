import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

//  as the actual value you want to acesss
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});


export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // to help the Auth singleton to listen and signout 
  // signOutUser();

  useEffect(()=>{
    const ubsubscribe = onAuthStateChangedListener((user)=>{
      if(user){
        // to create a new user for firebase
         createUserDocumentFromAuth(user);
      }
      // if the user exist just set that user
      setCurrentUser(user)
    });
   
    return ubsubscribe;
  },[]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
