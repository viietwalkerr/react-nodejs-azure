import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from "formik";
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import { baseUrl } from '../helpers/const';
import * as FaIcons from 'react-icons/fa';
import Cookies from 'js-cookie';

function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const { authState } = useContext(AuthContext);
    const {setAuthState} = useContext(AuthContext);
    const [loginStatus, setLoginStatus] = useState("");

    let history = useHistory();

    axios.defaults.withCredentials = true;

    const initialValues = {
        username: "",
        password: ""
    };

    // const loginSubmit = (data) => {
    //     axios.post(baseUrl + "auth/login", data, {crossDomain: true})
    //     .then((response) => {
    //         console.log(response.data)
    //         if (response.data.error) {
    //             alert(response.data.error);
    //             console.log(response.data.error);
    //         } else {
    //             console.log(response);
    //             history.push("/about");
    //         }
    //     });
    // };

    // new stuff
    const loginSubmit = (data) => {
        axios.post(baseUrl + "auth/login", data, {crossDomain: true})
        .then((response) => {
            console.log(response.data)
            if (response.data.error) {
                alert(response.data.error);
                console.log(response.data.error);
                setLoginStatus(response.data.error);
            } else {
                console.log("Response from Login post");
                console.log(response);
                Cookies.set("access-token", response.data.accessToken);
                setLoginStatus(response.data.user.username);
                setAuthState({authState,  
                    username: response.data.user.username, 
                    id: response.data.user.id, 
                    status: true 
                });
                history.push("/about");
            }
        });
    };
    
    useEffect(() => {
        // if (localStorage.getItem("accessToken")){
        //     history.push("/");
        // }
        // if (authState.status === true) {
        //     history.push("/");
        // }
    });

    const login = () => {
        const data = {username: username, password: password}; //creating an object
        axios.post(baseUrl + "auth/login", data, {crossDomain: true}
        )
        .then((response) => {
            console.log(response.data)
            if (response.data.error){
                alert(response.data.error);
                console.log(response.data.error);
            } else {
                setLoginStatus(response.data.username)
                // localStorage.setItem("accessToken", response.data.token);
                Cookies.set(response.data.accessToken);
                setAuthState({ 
                    username: response.data.user.username, 
                    id: response.data.user.id, 
                    status: true 
                });
                history.push("/about");
            }  
        });
    };


    return (
            <div className="background">
                <main>
                    <div className="formBox">
                        {/* <h2>Login</h2>
                        <p>Please enter your login details</p> 
                             <form netlify>
                                <div className="textbox">
                                    <i className="fas fa-user"></i>
                                    <span className="icon">
                                        <FaIcons.FaUserAlt />
                                    </span>
                                    <input 
                                        type='text' 
                                        placeholder='Username' 
                                        onChange={(event) => {
                                            setUsername(event.target.value)
                                        }}
                                    />
                                </div>
                                <div className="textbox">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                    <span className="icon">
                                        <FaIcons.FaLock />
                                    </span>
                                    <input 
                                        type='password' 
                                        placeholder='Password' 
                                        onChange={(event) => {
                                            setPassword(event.target.value)
                                        }}
                                    />
                                </div>
                                <button type='submit' className="rainbowButton" onClick={login}>
                                    <span>Sign In</span>
                                </button>
                            </form> */}
                            <Formik 
                                initialValues={initialValues}
                                onSubmit={loginSubmit}
                            >
                                <Form netlify>
                                    <div className="formBox">
                                        {/* <h2>Login Formik</h2> */}
                                        <h2>Login</h2>
                                        <p>Please enter your login details</p>
                                        <div className="textbox">
                                            <span className="icon">
                                                <FaIcons.FaUserAlt />
                                            </span>
                                            <Field
                                                autoComplete="off"
                                                className="inputField"
                                                name="username"
                                                placeholder="Username"
                                            />
                                        </div>
                                        <div className="textbox">
                                            <span className="icon">
                                                <FaIcons.FaLock />
                                            </span>
                                            <Field 
                                                autoComplete="off"
                                                className="inputField"
                                                name="password"
                                                placeholder="Password"
                                                type="password"
                                            />
                                        </div>
                                        <button type="submit" className="rainbowButton">
                                            <span>Submit</span>
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                           
                    </div>
                </main>
            </div>
    );
}

export default Login
