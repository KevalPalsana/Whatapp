import { createContext, useContext, useEffect, useState } from "react"
import { userAuth } from "./Authcontext";
import io from "socket.io-client";
const socketContext = createContext();

export const useSocketContext=()=>{
    return useContext(socketContext)
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers]= useState([])
    const {authuser} = userAuth();


    useEffect(() => {
        if (authuser) {
            const socketConnection = io("http://localhost:4000", {
                query: {
                    userId: authuser._id
                },
            });
            setSocket(socketConnection);
            socketConnection.on("getOnlineUsers",(users) =>{
                    setOnlineUsers(users);  
            });
            return()=>socketConnection .close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authuser]);
    return(
        <socketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </socketContext.Provider>
    )
};
