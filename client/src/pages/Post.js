import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../helpers/const';
import { AuthContext } from "../helpers/AuthContext";
import axios from 'axios';
import * as AiIcons from 'react-icons/ai';
import Cookies from 'js-cookie';


function Post() {
    let { id } = useParams();
    const { authState } = useContext(AuthContext);
    const [postObject, setPostObject] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
        axios.get(
            baseUrl + `posts/byId/${id}`,
        )
        .then((response) => {
        // console.log(response);
        // setListOfPosts(response.data);
            setPostObject(response.data);
            
            // setLikedPosts(response.data.Likes);
            // alert(postObject.Likes);
            // setLikedPosts(response.data.Likes.map((like)=> {
            //     return like.UserId;
            // }));

            // setAfterRender(false);
            // main code
            // setLikedPosts(likedPosts.map((userId) => {
            //     return userId.UserId;
            // }));

            // setLikedPosts(response.data)
            // setLikedPosts(likedPosts => likedPosts.map())


            // setLikedPosts(likedPosts => likedPosts.map());

            // setLikedPosts(response.data.Likes => response.data.Likes.map((like) => {
            //     return like.UserId;
            // }))
            // alert(likedPosts);
            // alert(response);
            // setLikedPosts(response.data.Likes);
            // setPostID(response.data.id);
            // return response.data.id;
            
            
        });
        axios.get(baseUrl + "posts",
            // {
            //     headers: {accessToken: localStorage.getItem("accessToken")}
            // }
            { 
                // headers: {userId: authState.id}
                headers: { accessToken: Cookies.get("access-token") },
            }
             
            // { withCredentials: true }
        )
        .then((response) => {
            setListOfPosts(response.data.listOfPosts);
            setLikedPosts(response.data.likedPosts.map((like)=> {
                return like.PostId;
            }));
        });
        
        axios.get(baseUrl + `comments/${id}`
         
        ).then((response) => {
            setComments(response.data);
        });
    }, []);

    // useLayoutEffect(() => {
    //     axios.get(
    //         "http://localhost:3001/likes", 
    //         { PostId: postId }, 
    //         { headers: { accessToken: localStorage.getItem("accessToken")}})
    // })

    // useLayoutEffect(() => {

    //     axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
    //     // console.log(response);
    //     // setListOfPosts(response.data);
    //         setPostObject(response.data);
            
    //         // setLikedPosts(response.data.Likes);
    //         // alert(postObject.Likes);
    //         setLikedPosts(response.data.Likes.map((like)=> {
    //             return like.UserId;
    //         }));

    //         // setAfterRender(false);
    //         // main code
    //         // setLikedPosts(likedPosts.map((userId) => {
    //         //     return userId.UserId;
    //         // }));

    //         console.log("API WAS CALLED!");

    //         // setLikedPosts(likedPosts => likedPosts.map())


    //         // setLikedPosts(likedPosts => likedPosts.map());

    //         // setLikedPosts(response.data.Likes => response.data.Likes.map((like) => {
    //         //     return like.UserId;
    //         // }))
    //         // alert(likedPosts);
    //         // alert(response);
    //         // setLikedPosts(response.data.Likes);
    //         // setPostID(response.data.id);
    //         // return response.data.id;
            
            
    //     });

    //     axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
    //         setComments(response.data);
    //     });
    // }, []);

    // useLayoutEffect(() => {
        

    //     if (!check){
    //         axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
        
    //         setLikedPosts(response.data.Likes.map((like)=> {
    //             return like.UserId;
    //         }));
    //     });
    //         setCheck(true);
    //     } else {
    //         setCheck(false);
    //     }

    const likePost = (postId, userId) => {
        // axios.post(
        //     "http://localhost:3001/likes", 
        //     { PostId: postId }, 
        //     { headers: { accessToken: localStorage.getItem("accessToken")}}
        // ).then((response) => {

        //     // alert(response.data);
        //     // Grab list, modify it, then set state to modified list (update)
        //     setPostObject(
        //         ()=> {
        //             if (postObject.data.liked) {
        //                 return {...postObject, Likes: [...postObject.Likes, 0]};
        //             } else {
        //                 const likesArray = postObject.Likes;
        //                 likesArray.pop();
        //                 return {...postObject, Likes: likesArray};
        //             }
        //         }
        //     );

        //     if (likedPosts.includes(userId)) {
        //         setLikedPosts(
        //             likedPosts.filter((userId) =>{
        //                 return !userId;
        //             })
        //         );
        //     } else {
        //         setLikedPosts([...likedPosts, userId]);
        //     }
        // })
    
        axios.post(baseUrl + "likes", 
            { PostId: postId }, 
            { 
                // headers: { accessToken: localStorage.getItem("accessToken") } 
                headers: { accessToken: Cookies.get("access-token") },
            }
        ).then((response) => {
            setListOfPosts(
                listOfPosts.map((post) => {
                    if (post.id === postId) {
                        if (response.data.liked) {
                            return {...post, Likes: [...post.Likes, 0]};
                        } else {
                            const likesArray = post.Likes;
                            likesArray.pop();
                            return {...post, Likes: likesArray};
                        }
                    } else {
                        console.log(post);
                        return post
                    }
                })
            );
            if (likedPosts.includes(postId)) {
                setLikedPosts(
                    likedPosts.filter((id) =>{
                        return id !== postId;
                    })
                );
            } else {
                setLikedPosts([...likedPosts, postId]);
            }
        });
    };
        
    const addComment = () => {
        axios.post(baseUrl + "/comments", 
            {
                commentBody: newComment, 
                PostId: id
            },
            {
                // headers: { accessToken: localStorage.getItem("accessToken") },
                headers: { accessToken: Cookies.get("access-token") },
            }
        ).then((response) => {
            if (response.data.error){
                alert(response.data.error);
            } else {
                // this section makes new comment appear automatically
                const commentToAdd = {commentBody: newComment, username: response.data.username}
                setComments([...comments, commentToAdd]) //add new element to array
                setNewComment(""); //set new comment to empty string
            }
        });
    };

    const deleteComment = (id) => {
        // use ` to add js variables
        axios.delete(baseUrl + `/comments/${id}`, 
            {
                // headers: {accessToken: localStorage.getItem("accessToken")},
                headers: { accessToken: Cookies.get("access-token") },
            }
        )
        .then(()=> {
            //loops through list of comments, and grabs each comment in variable val
            setComments(
                comments.filter((val) => {
                    return val.id !== id;
                })
            );
        }); 
    };

    const deletePost = (id) => {
        axios.delete(baseUrl + `/posts/${id}`, 
            {
                // headers: { accessToken: localStorage.getItem("accessToken") },
                headers: { accessToken: Cookies.get("access-token") },
            }
        )
        .then(() => {
            console.log("wow it did something!");
        });
    };

    // const deletePost = (id) => {
    //     axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
    //         alert("delete success");
    //         history.push("/");
    //     });
    // };

    const editPost = (option) => {
        if (option === "title") {
            let newTitle = prompt("Enter New Title:");
            axios.put(baseUrl + "/posts/title", 
                { 
                    newTitle: newTitle, 
                    id: id
                },
                {
                    // headers: { accessToken: localStorage.getItem("accessToken")}
                    headers: { accessToken: Cookies.get("access-token") },
                }
            );
            setPostObject({...postObject, title: newTitle});
        } else {
            let newPostText = prompt("Enter New Post Text:");
            axios.put(baseUrl + "/posts/postText",
                { 
                    newText: newPostText, 
                    id: id
                },
                {
                    // headers: { accessToken: localStorage.getItem("accessToken")}
                    headers: { accessToken: Cookies.get("access-token") },
                }
            );
            setPostObject({...postObject, postText: newPostText});
        }
    };

    return (
        
        <div className="background">
            <main>
                <h2>Post #{id}</h2>
                <div className="postPage">
                    <div className="leftSide">
                        {listOfPosts.map((value) => {
                            if (value.id === postObject.id) {
                            return (
                                <div key={postObject.id} className="post" id="individual">
                                    <div className="title" onClick={() => {
                                        if (authState.username === postObject.username){
                                            editPost("title");
                                        }
                                    }}>
                                        {value.title}
                                    </div>
                                    <div className="body" onClick={() => {
                                        if (authState.username === postObject.username){
                                            editPost("body");
                                        }
                                    }}>
                                        {value.postText}
                                    </div>
                                    <div className="footer">
                                        <div className="username">
                                            {value.username}
                                        </div>
                                        {authState.username === postObject.username && (
                                            <button 
                                                className="rainbowButton"
                                                onClick={() => {
                                                    deletePost(postObject.id);
                                                }}
                                            >
                                            <span>Delete Post</span></button>
                                        )}
                                        {!likedPosts.includes(value.id) ? (
                                            <div className="likeButtons">
                                                <AiIcons.AiOutlineLike className="likeIcon" onClick={() => {likePost(value.id)}}/>
                                            </div>
                                        ) : (
                                            <div className="likeButtons">
                                                <AiIcons.AiFillLike className="likeIcon" onClick={() => {likePost(value.id)}}/>
                                            </div>
                                        )}
                                        <label> {value.Likes.length}</label>
                                        
                                    </div>
                                </div>
                            )
                        }
                        })}
                        
                    </div>
                    <div className="rightSide">
                        <div className="addCommentContainer">
                            <h2>Add Comment</h2>
                            <div className="textbox">
                                <input 
                                    type='text' 
                                    placeholder='Comment...' 
                                    autoComplete="off"
                                    value={newComment} 
                                    onChange={(event) => {setNewComment(event.target.value)}}
                                    
                                />
                            </div>
                            <button className="rainbowButton" onClick={addComment}><span>Add Comment </span></button>
                        </div>
                        <div className="listOfComments">
                            {comments.map((comment, key) => {
                                return (
                                    <div key={key} className="comment"> 
                                        {comment.commentBody} 
                                        <div><label> By User: {comment.username}</label></div>
                                        
                                        {authState.username === comment.username && (
                                            <button className="rainbowButton" onClick={() => {deleteComment(comment.id)}}><span> Delete </span></button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Post
