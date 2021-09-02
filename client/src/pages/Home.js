import React/*, { useContext }*/ from 'react';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { baseUrl } from '../helpers/const';
import { AuthContext } from '../helpers/AuthContext';
import * as AiIcons from 'react-icons/ai';
import Cookies from 'js-cookie';


function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const { authState } = useContext(AuthContext);
    let history = useHistory();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        //redirect 
        // if (!localStorage.getItem("accessToken")) {
        //     history.push("/login");
        if (authState.status === false) {
            // history.push("/");            
        } else {
            axios.get(baseUrl + "posts", 
                { 
                //     headers: { accessToken: localStorage.getItem("accessToken")}
                    headers: { accessToken: Cookies.get("access-token") }
                }
                // { headers: {userId: authState.id, username: authState.username}}
            ).then((response) => {
                // contains 2 arrays, listsOfPosts and likedPosts
                setListOfPosts(response.data.listOfPosts);
                setLikedPosts(response.data.likedPosts.map((like) => {
                    return like.PostId;
                }));
            });
        }
    }, [history]);
    
    const likePost = (postId) => {
        axios.post(
            baseUrl + "likes", 
            { PostId: postId }, 
            { headers: { accessToken: Cookies.get("access-token")}}
        ).then((response) => {
            // Grab list, modify it, then set state to modified list (update)
            setListOfPosts(
                listOfPosts.map((post) => {
                    // specific post
                    if (post.id === postId) {
                        if (response.data.liked) {
                            // ...post (keep everything in the post the same, but at the end, add item)
                            return {...post, Likes: [...post.Likes, 0] };
                        } else {
                            const likesArray = post.Likes;
                            // pop removes last element
                            likesArray.pop();
                            // return modified item (array with 1 less item)
                            return {...post, Likes:  likesArray};
                        }
                    } else {
                        return post;
                    }
                })
            );

            if (likedPosts.includes(postId)) {
                setLikedPosts(
                    likedPosts.filter((id) => {
                        return id !== postId;
                    })
                )
            } else {
                setLikedPosts([...likedPosts, postId]);
            }
        });
    }
    return (
            <div className="background">
                <main className="posts">
                    <h2>Posts Feed</h2>
                    {listOfPosts.map((value, key) => { 
                        return (
                        <div key={key} className="post">
                            <div className="title"> 
                                {value.title} 
                            </div> 
                            <div className="body" onClick={() => {history.push(`/post/${value.id}`)}}> 
                                {value.postText} 
                            </div> 
                            <div className="footer"> 
                                <div className="username">
                                    <Link to={`/profile/${value.username}`}>
                                        {value.username} 
                                    </Link>
                                </div>
                                
                                
                                {!likedPosts.includes(value.id) ? (
                                    <div className="likeButtons">
                                        <AiIcons.AiOutlineLike className="likeIcon" onClick={() => {likePost(value.id)}}/>
                                    </div>
                                ) : (
                                    <div className="likeButtons">
                                        <AiIcons.AiFillLike className="likeIcon" onClick={() => {likePost(value.id)}}/>
                                    </div>
                                )}
                                
                                <label> {value.Likes.length} </label>
                            </div> 
                        </div>
                        );
                    })}
                </main>
            </div>
    )
}

export default Home