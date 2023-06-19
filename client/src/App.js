import logo from './logo.svg';
import react from 'react'
import './App.css';
import UI from './components/UI'
import Task from './components/task'
import Profile from './components/Profile'
import Message from './components/Message'
import Login from './components/login'
import Signup from './components/Signup'
import List from './components/List'
import Currentlist from './components/CurrentList'
import {Routes,Route} from 'react-router-dom'

function App() {
  return (
     <Routes>
      <Route path="/" element = {<UI/>}/>
      <Route path="/task" element = {<Task/>}/>
      <Route path="/profile" element = {<Profile/>}/>
      <Route path="/message" element = {<Message/>}/>
      <Route path="/login" element = {<Login/>}/>
      <Route path="/signup" element = {<Signup/>}/>
      <Route path="/list" element = {<List/>}/>
      <Route path="/currentlist" element = {<Currentlist/>}/>
    </Routes>
  );
}

export default App;
