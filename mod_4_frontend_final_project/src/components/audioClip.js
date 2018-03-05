import React from 'react'
import Sound from 'react-sound';
import AudioClipUpdate from './audioClipUpdate'
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';

const renderAudioClip = (props) => {
  if (props.clip.url !== "") {
    return (
      <Router>
        <div className="AudioClip">
          <h3>{props.clip.title} | {props.clip.artist !== "" ? props.clip.artist : "Unknown"}</h3>
          <Switch>
            <Route path="/tracks/:id" render={(routerParams) => {
              return <AudioClipUpdate id={props.clip.id} onClick={props.editSongSelection}/>
            }}/>
          </Switch>
          <button id={props.clip.id} onClick={props.editSongSelection} value="Edit Song"><NavLink to="/tracks/:id" exact value="Edit Song">Edit Song</NavLink></button>
          <Sound
           url={props.clip.url}
           playStatus={Sound.status.PLAYING}
           playFromPosition={300}
           onLoading={this.handleSongLoading}
           onPlaying={this.handleSongPlaying}
           onFinishedPlaying={this.handleSongFinishedPlaying}
          />
        </div>
      </Router>
    )
  }
}

const AudioClip = (props) => {
  return (
    <div>
      {renderAudioClip(props)}
    </div>
  )
}

export default AudioClip
