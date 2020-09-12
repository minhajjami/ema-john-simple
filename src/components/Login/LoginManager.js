import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';

 export const initializeLoginFramework=()=>{
     if(firebase.apps.length===0){
        firebase.initializeApp(firebaseConfig);
     }
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
     return firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success:true
        }
        return (signedInUser);
      })
      .catch(error => {
        console.log(error);
        console.log(error.message);
      })
  }

  export const handleSignOut = () => {
    return firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error:'',
          success:false
        }
        return(signedOutUser);
      })
      .catch(error => {
        console.log(error);
      })
  }

  export const createUserWithEmailAndPassword=(name,email,password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(res=>{
      const newUserInfo=res.user;
      newUserInfo.error='';
      newUserInfo.success=true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch(error=> {
      const newUserInfo={};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
      return newUserInfo;
    });
  }

  export const signInwithEmailAndPassword=(email,password)=>{
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then(res=>{
      const newUserInfo=res.user;
      newUserInfo.error='';
      newUserInfo.success=true;
      return newUserInfo;
    })
    .catch(error=> {
      const newUserInfo={};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
      return newUserInfo;
    });
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