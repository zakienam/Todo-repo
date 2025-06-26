import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app)
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
                        
    const signInUser = ()=>{
        signInWithEmailAndPassword(auth,email,password)
        .then((value)=> {
            console.log("Signin Success");
            navigate("/home");
        })
        .catch((err)=> console.log(err)) 
    } 
 
  return (    
    <> 
    <h1 className=" text-center">Login</h1>
     <div className="container d-flex justify-content-center"> 
        <div className="signup border py-5 my-5 bg-secondary ">
          <input className="inp p-2" type="text"  placeholder="Enter Your E-mail" onChange={(e)=> setEmail(e.target.value)} value={email} />
          <input
            className="inp p-2"   
            type="password" 
            placeholder="Enter Your Password"
            onChange={(e)=> setPassword(e.target.value)} value={password}
          />
          <button className=" button mt-3" onClick={signInUser}>
            Loggin   
          </button>
           
          <div className="details">
            <Link to='/signup'>Dont't Have Account ?</Link>
            
 
          </div>
        </div>
      </div> 
    </>
  )
}

export default Login