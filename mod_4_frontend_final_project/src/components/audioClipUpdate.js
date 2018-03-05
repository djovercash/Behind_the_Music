import React from 'react'
import AudioContainer from './audioContainer'
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';

const AudioClipUpdate = (props) => {
  return (
    <Router>
      <div className="AudioClip">
        <form onSubmit={props.updateClip}>
          <h2>Edit Your Clip Here</h2>
          <h3>Title: </h3>
          <input type="text" name="title" placeholder={props.clip.title} onChange={props.updateTitle}/>
          <h3>Artist: </h3>
          <input type="text" name="artist" placeholder={props.clip.artist} onChange={props.updateArtist}/><br/ >
          <input type="submit" value="submit" />
        </form>
        <Switch>
          <Route path="/users/:id" render={(routerParams) => {
            return <AudioContainer />
          }}/>
        <button onClick={props.stopEdit}><NavLink to="/users/:id" exact value="Edit Song">Home</NavLink></button>
        </Switch>
        <button onClick={props.deleteClip}>Delete Clip</button>
      </div>
    </Router>
  )
}


export default AudioClipUpdate
