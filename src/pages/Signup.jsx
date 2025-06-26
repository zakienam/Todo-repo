
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(app)

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
 
  const createUser=()=>{
    createUserWithEmailAndPassword(auth,email,password).then(value=> alert('Success'));
    navigate("/");
  }
  return (
    <> 
    <h1 className=" text-center">Signup</h1>
      <div className="container d-flex justify-content-center">  
        <div className="signup border py-5 my-5 bg-dark ">
          <input className="inp p-2" type="text" placeholder="Enter Your E-mail" onChange={e => setEmail(e.target.value)} value={email}/>
          <input
            className="inp p-2"   
            type="password"
            placeholder="Enter Your Password"
            onChange={e => setPassword(e.target.value)} value={password}
          />
          <button className=" button mt-3" onClick={createUser}>
            Signup  
          </button> 

          <div className="details">
          <Link to='/'>Already have an Account !</Link>
           
          </div>
        </div>
      </div> 
    </>
  ); 
};

export default Signup;
