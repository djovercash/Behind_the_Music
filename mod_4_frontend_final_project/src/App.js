import React, { Component } from 'react';
import NavBar from './components/navbar'
import AudioContainer from './components/audioContainer'
import Login from './components/login'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import NewUserForm from './components/newUserForm'

const LOGINURL = 'http://localhost:3000/login'
const USERSURL = 'http://localhost:3000/users'

class App extends Component {

  state = {
    logged_in: false,
    user_info: {}
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
          user_info: data
        })
      } else {
        this.setState({
          user_info: data,
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
          user_info: data
        })
      } else {
        this.setState({
          logged_in: true,
          user_info: data
        })
        localStorage.setItem("user_id": data.id)
      }
    })
  }

  LogOut = (event) => {
    localStorage.clear()
    this.setState({
      logged_in: false,
      user_info: {}
    })
  }

  fetchUsers() {
    return fetch(USERSURL).then(res => res.json())
  }


  componentDidMount() {
    if (localStorage["user_id"]) {
      let id = parseInt(localStorage.user_id)
      this.fetchUsers()
      .then(data => {
        let user = data.find(user => user.id === id)
        this.setState({
          user_info: user
        })
      })
    }
  }

  whatToRender() {
    if (this.state.user_info.username) {
      return (
        <Router>
          <div className="LoggedIn">
            <NavBar Logout={this.LogOut} username={this.state.user_info.username}/>
              <Route path="/users/:id" render={(routerParams) => {
                return <AudioContainer clips={this.state.user_info.clips} />
              }}/>
              <Redirect from='/' to="/users/:id" />
          </div>
        </Router>
      )
    } else {
      return (
        <Router>
          <div>
            <NavBar username={this.state.user_info.username}/>
            <Switch>
              <Route path="/login" render={(routerParams) => {
                return <Login handleLogin={this.LogIn}/>
              }}/>
              <Route path="/signup" render={(routerParams) => {
                return <NewUserForm handleSignUp={this.createUser} />
              }}/>
            </Switch>
            <h3>{this.state.user_info.message === "User Not Found" ? "There was an error. Please reenter your username and password" : null}</h3>
            <h3>{this.state.user_info.message === "Invalid Information. Please try again" ? "There was an error. Please reender desired username and password" : null}</h3>
          </div>
        </Router>
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
