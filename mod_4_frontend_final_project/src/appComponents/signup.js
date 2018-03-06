import React from 'react'

const signupForm = (props) => {
  return (
    <div className="form">
      <h1>SIGN UP</h1>
      <form onSubmit={props.handleSignUp}>
        <div className="signupInput">
          <h3>Username: </h3>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div className="signupInput">
          <h3>Password: </h3>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <div className="signupInput">
          <h3>Password Confirmation: </h3>
          <input type="password" name="passwordConfirmation" placeholder="Password Confirmation" />
        </div>
        <br />
        <input id="submit" type="submit" value="Submit" />
      </form>
      <h3>{props.message === "Invalid Information. Please try again" ? "There was an error. Please reender desired username and password" : null}</h3>
    </div>
  )
}

export default signupForm
