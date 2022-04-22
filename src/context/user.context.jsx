import { createContext, useState, useEffect } from "react";

import { onAuthStageChangedListener, signOutUser, createUserDocFromAuth } from "../utils/firebase/firebase.utils";

// actual value I want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
})

export const UserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null)
    const value = {currentUser, setCurrentUser}

    useEffect(() =>{
       const unsubscribe =  onAuthStageChangedListener((user) => {
            // console.log(user);
            if(user){
                createUserDocFromAuth(user)
            }
            setCurrentUser(user)
        })

        return unsubscribe
        
    }, [])

    return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
    )
}