import React, { useEffect, useRef, useState } from 'react';
import {firebase,db, auth} from '../../firebase';
import './MessagingPage.css'
import Message from './message/message'
import { Firestore, addDoc, collection, doc, limit, onSnapshot, orderBy, query, serverTimestamp, where} from 'firebase/firestore';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'

function MessagingPage(props) {
    const room = props.room;
    const userDetails = props.userDetails;
    const isAuth = props.isAuth;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "Messages");
  const messagesContainerRef = useRef(null);

  const navigate = useNavigate();

   useEffect(() => {
     const queryMessages = query(
       messagesRef,
       orderBy("createdAt")
     );

     const unsuscribe = onSnapshot(queryMessages,(snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({...doc.data(),id: doc.id})
      })

      setMessages(messages);

      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;

      const lastMessage = document.querySelector('.message:last-child');
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth' });
      }

     })

     return () => unsuscribe();
   }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: userDetails.name,
    });

    setNewMessage("");
  };

  const handleBack = () => {
    navigate('/');
  }

  return (
    <motion.div className="container"
    initial ={{width: 0}}
    animate ={{width: "100%"}}
    exit = {{x: -window.innerWidth,transition: {duration: 0.1}}}>
        <button className="back"
           onClick = {handleBack}>
            <AiOutlineArrowLeft
            className = "mr-1"/>Back to Home
        </button>
        <div className="chat-app">

      <div className="header">
        <h1>Welcome <strong>{userDetails.name} </strong> <br/>In Chat Room</h1>
      </div>
      
      <div className="messages" ref={messagesContainerRef}>
    {messages.map((messages) => 
        <div className="messages1">
         

           <div className="message1">

             <div className = "user1">
              <span className="user">{messages.user}: </span><div className = "usermsg">  <span>{messages.text}</span> </div> 
               <span className = "time">{messages.createdAt?.toDate().toLocaleString()}</span>
             </div>
            
           </div>
          
        </div>)}

      </div>
      <form className="new-message-form"
       onSubmit = {handleSubmit}>
        <input
          type="text"
          value = {newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="btn">
          Send
        </button>
      </form>
    </div>
    </motion.div>
    
  );
}

export default MessagingPage;