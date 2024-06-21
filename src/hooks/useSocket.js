import React, { useEffect, useState } from 'react'

const WS_URL="ws://localhost:8080";

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {

        const ws=new WebSocket(WS_URL);
        ws.onopen=()=>{
            console.log("connected");
            setSocket(ws);
        }
        ws.onclose=()=>{
            console.log("disconnected");
            setSocket(null);
        }
        return ()=>{
            ws.close();
        }
    },[]);
    return socket;
}

export default useSocket
