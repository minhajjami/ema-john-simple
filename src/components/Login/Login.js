import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';



firebase.initializeApp(firebaseConfig);

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

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
      })
      .catch(error => {
        console.log(error);
        console.log(error.message);
      })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error:'',
          success:false
        }
        setUser(signedOutUser);
      })
      .catch(error => {
        console.log(error);
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
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res=>{
        const newUserInfo={...user};
        newUserInfo.error='';
        newUserInfo.success=true;
        setUser(newUserInfo);
        updateUserName(user.name);
      })
      .catch(error=> {
        const newUserInfo={...user};
        newUserInfo.error=error.message;
        newUserInfo.success=false;
        setUser(newUserInfo);
      });
    }

    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res=>{
        const newUserInfo={...user};
        newUserInfo.error='';
        newUserInfo.success=true;
        setUser(newUserInfo);
        SetLoggedInUser(newUserInfo);
        history.replace(from);
      })
      .catch(error=> {
        const newUserInfo={...user};
        newUserInfo.error=error.message;
        newUserInfo.success=false;
        setUser(newUserInfo);
      });
    }

    e.preventDefault();
  }

  const updateUserName=name=>{
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('update name successfully');
    }).catch(function(error) {
      console.log(error);
    })
  }

  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
          <button onClick={handleSignIn}>Sign in</button>
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
