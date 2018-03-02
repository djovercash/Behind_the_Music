import React from 'react'

const Login = (props) => (
  <form onSubmit={props.handleLogin}>
    <input name="username" placeholder="username" />
    <input name="password" type="password" placeholder="password" />
    <input type="submit"/>
  </form>
);

export default Login;
