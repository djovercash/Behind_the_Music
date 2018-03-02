import React, { Component } from 'react';
import NavBar from './components/navbar'
import AudioContainer from './components/audioContainer'
import Login from './components/login'
import './App.css';

const LOGINURL = 'http://localhost:3000/login'
const USERSURL = 'http://localhost:3000/users'

class App extends Component {

  state = {
    logged_in: false,
    user_info: {}
  }

  loginUser(username, password) {
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
    this.loginUser(username, password)
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

  fetchUser() {
    return fetch(USERSURL).then(res => res.json())
  }


  componentDidMount() {
    if (localStorage.user_id) {
      let id = parseInt(localStorage.user_id)
      this.fetchUser()
      .then(data => {
        let user = data.find(user => user.id === id)
        this.setState({
          user_info: user
        })
      })
    }
  }

  whatToRender() {
    if (!this.state.user_info.username) {
      return (
        <div className="needLogin">
          <NavBar />
          <Login handleLogin={this.LogIn} />
          <h3>{this.state.user_info.message === "User Not Found" ? "There was an error. Please reenter your username and password" : null}</h3>
        </div>
      )
    } else {
      return (
        <div className="LoggedIn">
          <NavBar />
          <AudioContainer clips={this.state.user_info.clips} />
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
