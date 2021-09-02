import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthContext } from './helpers/AuthContext';
import { baseUrl } from './helpers/const';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Success from './pages/Success';
import Profile from './pages/Profile';
import About from './pages/About';
import Settings from './pages/Settings';
import ChangePassword from './pages/ChangePassword';
import NotFound from './pages/NotFound';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

function scrollFunction()
{
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
  {
    document.getElementById("backToTopBtn").style.display = "block";
  }
  else
  {
    document.getElementById("backToTopBtn").style.display = "none";
  }
}

function topFunction()
{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function App() {
  // Check login
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios.get(baseUrl +"auth/token", 

    // #### IDEA: create header and assign accesstoken header to cookies.get
      {
        headers: { accessToken: Cookies.get("access-token")}
      }
    // {
      // headers: {
      //   accessToken: localStorage.getItem("accessToken")
      // }
     
    // },
     )
    .then((response) => {
      console.log("checked for token");
      console.log(response);
      // Checks for errors for login state
      if (response.data.error) {
        console.log(response.data.error);
        setAuthState({...authState, status: false}); //only change 1 
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });
    
    axios.get(baseUrl +"auth/login").then((response) => {
      console.log("login get req");
      console.log(response);
    })
  },[]);

  window.onscroll = function() {scrollFunction()};

  return (
    <div className="App">
      <button onClick={topFunction} id="backToTopBtn" className="rainbowButton" title="Go to top">
        <span>Back to Top</span>
      </button>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar authState={authState} setAuthState={setAuthState}/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/success" component={Success} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/profile/:usernameInput" component={Profile} />
            <Route path="/settings" component={Settings} />
            <Route path="/changepassword" component={ChangePassword} />
            <Route path="/about" component={About} />
            <Route path="*" exact component={NotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
