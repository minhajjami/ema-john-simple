import React, { useContext, useState } from 'react';

import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInwithEmailAndPassword } from './LoginManager';

initializeLoginFramework();

function Login() {
  const [newUser,setNewUser]=useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    newUser:false,
    name: '',
    email: '',
    photo: ''
  });

  const[loggedInUser,SetLoggedInUser]=useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn=()=>{
      handleGoogleSignIn()
      .then(res=>{
        handleResponse(res,true);
      })
  }

  const signOut=()=>{
    handleSignOut()
    .then(res=>{
        handleResponse(res,false);
    })
}

  const handleBlur=(e)=>{
    
    let isFieldValid=true;
    if(e.target.name ==='email'){
       isFieldValid=/\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name==='password'){
      const hasPasswordMinLenth=e.target.value.length;
      const hasPasswordOneNumber=/\d{1}/.test(e.target.value);
      isFieldValid=hasPasswordMinLenth && hasPasswordOneNumber;
    }
    if(isFieldValid){
        const newUserInfo={...user};
        newUserInfo[e.target.name]=e.target.value;
        setUser(newUserInfo);
    }
  }

  const handleSubmit=(e)=>{

    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res=>{
        handleResponse(res,true);
      })
    }

    if(!newUser && user.email && user.password){
        signInwithEmailAndPassword(user.email,user.password)
        .then(res=>{
            handleResponse(res,true);
          })
    }
    e.preventDefault();
  }

  const handleResponse=(res,redirect)=>{
    setUser(res);
    SetLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
  }

  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
          <button onClick={googleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome,{user.name}</p>
          <p>Your email {user.email}</p>
          <img src={user.photo} alt="" width="100px" />
        </div>
      }

      <h1>Our Own Authentication</h1>
      <input type="checkbox" name="newUser" id="" onChange={()=>setNewUser(!newUser)}/>
      <label htmlFor="newUser">New User Registration</label>
      <form onSubmit={handleSubmit}>
          {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Enter Your Name"/>}    
          <br/>
          <input type="text" name="email" onBlur={handleBlur} placeholder="Enter Your Email"/>
          <br/>
          <input type="password" name="password" onBlur={handleBlur} id=""placeholder="Enter Your Password"/>
          <br/>
          <input type="submit" value={newUser ? 'Sign Up': 'Sign In'}/>
          <p style={{color:'red'}}>{user.error}</p>
          {
           user.success && <p style={{color:'green'}}>User  { newUser ?'created':'logged In'} Successfully</p>
          }
      </form>
    </div>
  );
}

export default Login;
