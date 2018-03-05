import React from 'react'

const signupForm = (props) => {
  return (
    <div>
      <h1>Sign Up for the bestest best app ever!</h1>
      <form onSubmit={props.handleSignUp}>
        <h3>Username: </h3>
        <input type="text" name="username" placeholder="Username" />
        <h3>Password: </h3>
        <input type="password" name="password" placeholder="Password" />
        <h3>Password Confirmation: </h3>
        <input type="password" name="passwordConfirmation" placeholder="Password Confirmation" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default signupForm
