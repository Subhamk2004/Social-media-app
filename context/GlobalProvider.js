import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

let GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null); 
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
        .then((res) => {
            if(res) {
                setIsLoggedIn(true);
                setUser(res);
                console.log(res);
                
            }
            else {
                setIsLoggedIn(false);
                setUser(null);
            }
        })
        .catch((error) => {
            console.log("error is",error);
            
        })
        .finally(() => {
            setisLoading(false);
        })
    }, []);

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            setUser,
            user,
            isLoading
        }} >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;