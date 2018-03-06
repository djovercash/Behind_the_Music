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
        <h3 onClick={props.Home}><NavLink to="/users/:id" exact>Good {setTimeOfDay(time)}, {props.user.username}</NavLink></h3>
        <h3>|</h3>
        <h3 onClick={props.Logout}><NavLink to='/login' exact>Logout</NavLink></h3>
      </div>
    )
  } else if (window.location.pathname === "/login") {
    return (
      <div id="userLogin">
        <h3><NavLink to='/signup' exact>Sign Up</NavLink></h3>
      </div>
    )
  } else {
    return (
      <div id="userLogin">
        <h3><NavLink to='/login' exact>Login</NavLink></h3>
      </div>
    )
  }
}

const NavBar = (props) => {
  return (
    <div id="navBar">
      <div id="logoTitle">
        <img src='../orangeLogo.png' alt="Behind the Music"/>
      </div>
      <div>
        {userExists(props)}
      </div>
    </div>
  )
}

export default NavBar
