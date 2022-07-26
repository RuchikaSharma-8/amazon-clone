import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();
        auth
            .signInWithEmailAndPassword( email, password )
            .then(auth => {
                history.push('/')
            })
            .catch(error => alert(error.message))
    }
    const register = e => {
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword( email, password )
            .then(( auth ) => {
                //succesfully created a new user with email and password
                console.log(auth); 
                if( auth ) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }
  return (
    <div className='login'>
        <Link to='/'>
            <img className="login-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" alt="amazon_logo"/>
        </Link>
        <div className="login-container">

            <h1> Sign-In </h1>
            <form>
                <h5> E-mail </h5>
                <input type="text" value={ email } onChange={e => setEmail( e.target.value )} />
                <h5> Password </h5>
                <input type="password" value={ password } onChange={e => setPassword( e.target.value )} />
                <br />
                <button onClick={ signIn } type="submit">Sign In</button>
            </form>

            <p>
                By continuing, you agree to <b> AMAZON CLONE </b> Conditions of Use & Sale. 
                Please see our Privacy Notice, our Cookies Notice & our Interest
                Based Ads Notice. 
            </p>

            <button className="login-register-button" onClick={ register }> Create your Amazon Account </button>
        </div>
    </div>
  )
}

export default Login