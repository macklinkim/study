import { useEffect, useState } from "react";
import "./App.css";
import socket from "./server"
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList]=useState([]);
  console.log("message List", messageList);

  useEffect(()=>{
    socket.on('message',(message)=>{
      setMessageList((prevState) => prevState.concat(message));
    });
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
  const sendMessage= (event)=>{
    event.preventDefault();
    socket.emit("sendMessage",message, (res)=>{
      console.log("sendMessage Res:", res);
    });
  };
  return (
    <div>
    <div className="App">
      <MessageContainer messageList={messageList} user={user}/>
      <InputField message={message} setMessage={setMessage} sendMessage={sendMessage}/>
    </div>
      
    </div>
  );
}

export default App;