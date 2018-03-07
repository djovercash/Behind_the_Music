import React, { Component } from 'react';
import NavBar from './appComponents/navbar'
import AudioContainer from './appComponents/audioContainer'
import Login from './appComponents/login'
import Signup from './appComponents/signup'
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';

const LOGINURL = 'http://localhost:3000/login'
const USERSURL = 'http://localhost:3000/users'

class App extends Component {

  state = {
    logged_in: false,
    user: {}
  }

  fetchLoginUser(username, password) {
    return fetch(LOGINURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => res.json())
  }

  LogIn = (event) => {
    event.preventDefault()
    let username = event.target.username.value
    let password = event.target.password.value
    this.fetchLoginUser(username, password)
    .then(data => {
      if (data.message === "User Not Found") {
        this.setState({
          logged_in: false,
          user: data
        })
      } else {
        this.setState({
          user: data,
          logged_in: true
        })
        localStorage.setItem("user_id", data.id)
      }
    })
  }

  fetchCreateUser(username, password, passwordConfirmation) {
    return fetch(USERSURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password,
        password_confirmation: passwordConfirmation
      })
    }).then(res => res.json())
  }

  createUser = (event) => {
    event.preventDefault()
    let username = event.target.username.value
    let password = event.target.password.value
    let passwordConfirmation = event.target.passwordConfirmation.value
    this.fetchCreateUser(username, password, passwordConfirmation)
    .then(data => {
      if(data.message === "Invalid Information. Please try again") {
        this.setState({
          logged_in: false,
          user: data
        })
      } else {
        this.setState({
          logged_in: true,
          user: data
        })
      }
      localStorage.setItem("user_id", data.id)
    })
  }

  LogOut = (event) => {
    localStorage.clear()
    this.setState({
      logged_in: false,
      user: {}
    })
  }

  fetchUser(id) {
    return fetch(`${USERSURL}/${id}`).then(res => res.json())
  }

  componentDidMount() {
    if (localStorage["user_id"]) {
      let id = parseInt(localStorage.user_id)
      this.fetchUser(id)
      .then(data => {
        this.setState({
          user: data
        })
      })
    }
  }

  whatToRender() {
    if (this.state.user.username) {
      return (
        <div className="LoggedIn">
          <NavBar Logout={this.LogOut} user={this.state.user}/>
          <Switch>
            <Route path="/users/:id" render={(routerParams) => {
              return <AudioContainer ref="audioContainer" clips={this.state.user.clips} user={this.state.user.id}/>
            }}/>
            <Redirect from="/" to="/users/:id" />
          </Switch>
        </div>
      )
    } else {
      return (
        <div className="NotLoggedIn">
          <NavBar user={this.state.user}/>
          <Switch>
            <Route path="/login" render={(routerParams) => {
              return <Login message={this.state.user.message} handleLogin={this.LogIn}/>
            }}/>
            <Route path="/signup" render={(routerParams) => {
              return <Signup message={this.state.user.message} handleSignUp={this.createUser} />
            }}/>
            <Redirect from="/" to="/login" />
          </Switch>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        {this.whatToRender()}
      </div>
    );
  }
}

export default App;
