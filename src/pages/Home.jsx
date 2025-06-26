import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase'

import AddNewTaskForm from '../components/AddNewTaskForm';
import TodoList from '../components/TodoList';

const auth = getAuth(app);
   
const Home = () => {
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false);
       
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){  
            setUser(user) 
      }else{        
            setUser(null); 
            navigate("/");
      }  
    })
  },[])

  if(!user)
    return null;  
     
  return ( 
   <> 
   <div className="container-fluid bg-secondary text-light py-5 d-flex justify-content-between ">
    <h1>Todo</h1>
    <button className='btn border text-light ' onClick={()=>{
        signOut(auth);
        navigate("/");
    }}>Log Out</button>
   </div>
   <div className=" py-5  home">
    <div className="box text-center">
        <button className='btn border bg-dark text-light' onClick={handleShow}>Add New Task</button>
    </div>   
   </div>                   
   <AddNewTaskForm show={show} handleClose={handleClose} setFlag={setFlag}/>
      <div>
        <TodoList flag={flag} setFlag={setFlag}/> 
      </div> 
   </>   
  )
} 

export default Home