import { useEffect, useState } from "react";
import "./App.css";
import socket from "./server"

function App() {

  const [user, setUser] = useState(null);

  useEffect(()=>{
    askUserName();
  },[]);

  const askUserName = ()=>{
    const userName = prompt("what is your name?");
    console.log("user:", userName);

    socket.emit("login", userName,(res)=>{
      if(res?.ok){
        setUser(res.data);

      }
    });
  };
  return (
    <div>
      <div className="App"></div>
    </div>
  );
}

export default App;
