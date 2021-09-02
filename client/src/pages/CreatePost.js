import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../helpers/const';
import axios from 'axios';
import * as Yup from 'yup';
import * as FaIcons from 'react-icons/fa';
import Cookies from 'js-cookie';


function CreatePost() {

    let history = useHistory();
    const initialValues = {
        title: "",
        postText: "",
    };

    // Validate input
    // Requires login
    useEffect(() => {
        // if (!localStorage.getItem("accessToken")) {
        //     history.push("/login");
        // }
        if (!Cookies.get()) {
            history.push("/");
        }
    }, [history]); //need to put array or useEffect will continue infinitely
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a Title!"),
        postText: Yup.string().required("You must input text for Post!"),
    });

    const onSubmit = (data) => {
        // Use headers to pass username
        axios.post(
            baseUrl + "posts", data, 
            {
                // headers: { accessToken: localStorage.getItem("accessToken") },
                headers: { accessToken: Cookies.get("access-token") },
            }
        ).then((response) => {
            history.push("/");
        }, [history]);
    };

    return (
        <div className="background">
            <main>
                
                {/* <div className="createPostPage">
                    <Formik 
                        initialValues={initialValues} 
                        onSubmit={onSubmit} 
                        validationSchema={validationSchema}
                    >
                        <Form className="formContainer">
                        <h2> Create Post </h2>
                            <label>Title: </label>
                            <ErrorMessage name="title" component="span" />
                            <Field 
                                autocomplete="off"
                                id="inputCreatePost" 
                                name="title" 
                                placeholder="(Ex. Title)"
                            />
                            <label>Post: </label>
                            <ErrorMessage name="postText" component="span" />
                            <Field 
                                autocomplete="off"
                                id="inputCreatePost" 
                                name="postText" 
                                placeholder="(Ex. Post)"
                            />
                            <label>Username: </label>
                            <ErrorMessage name="username" component="span" />
                            <Field 
                                autocomplete="off"
                                id="inputCreatePost" 
                                name="username" 
                                placeholder="(Ex. Username)"
                            />
                            <button type="submit">Create Post</button>
                        </Form>
                        
                    </Formik>
                    
                </div> */}
                    <div className="createPostPage">
                    <Formik 
                        initialValues={initialValues} 
                        onSubmit={onSubmit} 
                        validationSchema={validationSchema}
                    >
                        <Form className="formBox">
                        <h2> Create Post </h2>
                            

                            <div className="textbox">
                                    <ErrorMessage name="title" component="span" className="error" />
                                        <br></br>
                                        <span className="icon">
                                            <FaIcons.FaInfo />
                                        </span>
                                        <Field 
                                            autoComplete="off"
                                            id=""
                                            className="inputField" 
                                            name="title" 
                                            placeholder="Title"
                                        />
                            </div>
                            <div className="textbox">
                                    <ErrorMessage name="post-" component="span" className="error"/>
                                        <br />
                                        <span className="icon">
                                            <FaIcons.FaRegEdit />
                                        </span>
                                        <Field 
                                            autoComplete="off"
                                            id=""
                                            className="inputField" 
                                            name="postText" 
                                            placeholder="Post"
                                        />
                                       
                            </div>
                            <button className="rainbowButton" type="submit"><span>Create Post</span></button>
                        </Form>
                        
                    </Formik>
                    
                </div>
            </main>
        </div>
    )
}

export default CreatePost;
