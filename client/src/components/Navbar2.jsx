import React from 'react';
// import { Nav, Form, FormControl, NavDropdown, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { BrowserRouter as Link, NavLink } from 'react-router-dom';
import { SidebarData} from './SidebarData';
import './Navbar.css';
// import { IconContext } from 'react-icons';



styled.div`
  a {
    padding-left: 10px;
  }
  `;




class Navbar2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // activePath: props.location.pathname
      sidebar: false,
      setSidebar: false,
      // location: useLocation()
    };
    this.showSidebar = this.showSidebar.bind(this);
    this.logout = this.logout.bind(this);
    
  };

  // showSidebar = (sidebar, setSidebar) => 
  //   setSidebar(!sidebar)
  
  // showSidebar() {
  //   this.setState(state => {
  //     if (state.sidebar === false) {
  //       return { sidebar: true};
  //     } else {
  //       return { sidebar: false};
  //     }
  //   });
  // }
  
  logout = () => {
    localStorage.removeItem("accessToken");
    this.props.setAuthState(
      {
        username: "",
        id: 0,
        status: false 
      }); 
  };
  

  showSidebar() {
    this.setState(state => ({
       sidebar: !state.sidebar
    }));
  }
  
  render() {
    // onItemClick() {
    //   this.setState(state => ({ 
    //     activePath: item.path
    //   }));
    // }
    return (
      <>
      {/* change color, add styles */}
        <div className="navbar">
          <Link to="#" className='menu-bars'>
            <FaIcons.FaBars className="menu-bars" onClick={this.showSidebar} />
          </Link>
          <div className='topnav-items'>
            <NavLink activeClassName="topNavActive" to="/">Home</NavLink>
            <NavLink activeClassName="topNavActive" to="/about">About</NavLink>
            <NavLink activeClassName="topNavActive" to="/post/1">Post</NavLink>
            <NavLink activeClassName="topNavActive" to="/createpost">Create Post</NavLink>
            {/* <Form className="form-center">
            <FormControl type="text" placeholder="Search" className=""></FormControl>
            </Form> */}
            
          </div>
          <div className="topnav-profile">
            {!this.props.authState.status ? (
              <>
              
                
                <NavLink activeClassName="topNavActive" to="/login">Login</NavLink>
                <NavLink activeClassName="topNavActive" to="/register">Register</NavLink>
              </>
              ) : (
              <>
                <NavLink activeClassName="topNavActive" to="/profile">{this.props.authState.username}</NavLink>
                
                <NavLink activeClassName="topNavActive" to="/notfound">Settings</NavLink>
                <NavLink activeClassName="topNavActive" to="/logout" onClick={this.logout}>Logout</NavLink>
              </>
              )}
            
            
          </div>
          
        </div>
        {/* <SideNav sidebar={this.state.sidebar}/> */}
        {/* Start of Sidebar */}
        <nav className={this.state.sidebar ? 'sidenav active' : 'sidenav'}>
          <ul className='sidenav-items' onClick={this.showSidebar}>
            <li className="sidenav-toggle">
              <Link to="#" className='menu-bars'>
                <AiIcons.AiOutlineClose className="menu-cross"/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <NavLink activeClassName="sideNavActive" to={item.path} >
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
       
      </>
    )
  }
}

// class SideNav extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activePath: props.pathname,
//       sidebar: props.sidebar
//       // setSidebar: false
//     }

//   }
//   showSidebar() {
//     // setSidebar(!sidebar)
//     if (this.sidebar === false) {
//       this.props.setState({
//         sidebar: true
//       });
//     } else {
//       this.props.setState({
//         sidebar: false
//       });
//     }
//   }

//   // showSidebar() {
//   //   this.setState(state => ({
//   //      sidebar: !state.sidebar
//   //   }));
//   // }

//   render () {
//     // const { activePath} = this.state;
//     // const [sidebar, setSidebar] = useState(false)
//     // const showSidebar = () => setSidebar(!sidebar)
//     return (
//       <nav className={this.props.sidebar ? 'nav-menu active' : 'nav-menu'}>
//           <ul className='nav-menu-items' onClick={this.showSidebar}>
//             <li className="navbar-toggle">
//               <Link to="#" className='menu-bars'>
//                 <AiIcons.AiOutlineClose />
//               </Link>
//             </li>
//             {SidebarData.map((item, index) => {
//               return (
//                 <li key={index} className={item.cName}>
//                   <Link to={item.path} active={item.path === this.activePath}>
//                     {item.icon}
//                     <span>{item.title}</span>
//                   </Link>
//                 </li>
//               )
//             })}
//           </ul>
//         </nav>
//     )
//   }
// }
// function Navbar() {
//   const [sidebar, setSidebar] = useState(false)

//   const showSidebar = () => setSidebar(!sidebar)
//   return (
//     <>
//     <IconContext.Provider value={{color: 'red'}}>
//       <div className="navbar">
//         <Link to="#" className='menu-bars'>
//           <FaIcons.FaBars onClick={showSidebar} />
//         </Link>
//         <div className='topnav-items'>
//           <Link to="/">Home</Link>
//           <Link to="/About">About</Link>
//           <Link to="/Settings">Settings</Link>
//           <Form className="form-center">
//           <FormControl type="text" placeholder="Search" className=""></FormControl>
//           </Form>
          
//         </div>
//         <div className="topnav-profile">
//           <Link to="/Profile">Profile</Link>
//           <Link to="/Profile">Login</Link>
//           <Link to="/Profile">Register</Link>
//         </div>
        
//       </div>
//       <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
//         <ul className='nav-menu-items' onClick={showSidebar}>
//           <li className="navbar-toggle">
//             <Link to="#" className='menu-bars'>
//               <AiIcons.AiOutlineClose />
//             </Link>
//           </li>
//           {SidebarData.map((item, index) => {
//             return (
//               <li key={index} className={item.cName}>
//                 <Link to={item.path}>
//                   {item.icon}
//                   <span>{item.title}</span>
//                 </Link>
//               </li>
//             )
//           })}
//         </ul>
//       </nav>
//       </IconContext.Provider>
//     </>
    
//   )
// }

export default Navbar2
