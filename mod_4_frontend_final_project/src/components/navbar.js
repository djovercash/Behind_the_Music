import React from 'react'
import { NavLink } from 'react-router-dom';

const userExists = (props) => {
  if (props.username) {
    return (
      <div id="userLogin">
        <h5>Welcome Back, {props.username}</h5>
        <h5>|</h5>
        <h5 onClick={props.Logout}><NavLink to='/login' exact>Log out</NavLink></h5>
      </div>
    )
  } else if (window.location.pathname === "/login") {
    return (
      <div id="userLogin">
        <h5><NavLink to='/signup' exact>Sign Up</NavLink></h5>
      </div>
    )
  } else {
    return (
      <div id="userLogin">
        <h5><NavLink to='/login' exact>Login</NavLink></h5>
      </div>
    )
  }
}

const NavBar = (props) => {
  return (
    <div id="audioNavBar">
      <div id="logoTitle">
        <h5>Here is our logo and title</h5>
      </div>
      <div>
        {userExists(props)}
      </div>
    </div>
  )
}

export default NavBar
