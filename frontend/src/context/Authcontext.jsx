import React, {createContext, useContext, useEffect, useState} from "react";

const Authcontext = createContext();

export const Authpovider = ({children})=>{
    const [authuser,setAuthuser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setAuthuser(JSON.parse(storedUser));
        }
      }, []);

    return(
        <Authcontext.Provider value={{authuser, setAuthuser}}>
            {children}
        </Authcontext.Provider>
    )
};


export const userAuth = ()=> useContext(Authcontext)