import React from 'react'

const Login = (props) => (
  <div className="form">
    <h1>LOGIN INTO BEHIND THE MUSIC</h1><br />
    <form onSubmit={props.handleLogin}>
      <input name="username" placeholder="username" /><br />
      <input name="password" type="password" placeholder="password" /><br />
      <input id="submit" type="submit"/>
    </form>
    <h3>{props.message === "User Not Found" ? "There was an error. Please reenter your username and password" : null}</h3>
  </div>
);

export default Login;
