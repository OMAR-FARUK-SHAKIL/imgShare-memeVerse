import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import {  useLocation } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
// import { UserContext } from '../../../App';
// import LoginBg from '../../../images/diana-polekhina-BUfaFc4L8V0-unsplash.jpg';

const Login = () => {
//   const [loggedInUser, setLoggedInUser] = useContext(UserContext);
 const history = useHistory();

  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const { displayName, email } = result.user;
      const signedInUser = { name: displayName, email }
    //   setLoggedInUser(signedInUser);
      storeAuthToken();
    }).catch(function (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  const storeAuthToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        sessionStorage.setItem('token', idToken);
        history.replace(from);
      }).catch(function (error) {
        // Handle error
      });
  }

  return (
    <div className="login-page container ">
      
        <div className="w-50 mx-auto justify-content-center text-center mt-5">
          {/* <img style={{height:'300px'}}  src={LoginBg} alt=""/> */}
          <h2>Vaccine At Home Service</h2>
          <h5>Login Please...</h5>
          <div className="from-group mt-5">
            <button className="btn btn-info" onClick={handleGoogleSignIn}>Login With Google</button>
          </div>
       
       
      </div>
    </div>
  );
};

export default Login;