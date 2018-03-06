import React from 'react'

const Login = (props) => (
  <div className="form">
    <h1>Login to this Awesome App</h1><br />
    <form onSubmit={props.handleLogin}>
      <input name="username" placeholder="username" /><br />
      <input name="password" type="password" placeholder="password" /><br />
      <input type="submit"/>
    </form>
  </div>
);

export default Login;
