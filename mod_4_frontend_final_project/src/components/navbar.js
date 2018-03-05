import React from 'react'
import { NavLink } from 'react-router-dom';

const setTimeOfDay = (time) => {
  if (time < 12) {
    return "Morning"
  } else if (time >= 18) {
    return "Evening"
  } else {
    return "Afternoon"
  }
}

const userExists = (props) => {
  const time = new Date().getHours()
  if (props.user.username) {
    return (
      <div id="userLogin">
        <h5 onClick={props.Home}><NavLink to="/users/:id" exact>Good {setTimeOfDay(time)}, {props.user.username}</NavLink></h5>
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
