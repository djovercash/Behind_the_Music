import React from 'react'
import Sound from 'react-sound';

const renderAudioClip = (props) => {
  console.log(props)
  if (props.clip.url !== "") {
    return (
      <div>
        <h3>{props.clip.title} | {props.clip.artist !== "" ? props.clip.artist : "Unknown"}</h3>
        <button id={props.clip.id} onClick={props.editSongSelection}>Edit Song</button>
        <Sound
         url={props.clip.url}
         playStatus={Sound.status.PLAYING}
         playFromPosition={300}
         onLoading={this.handleSongLoading}
         onPlaying={this.handleSongPlaying}
         onFinishedPlaying={this.handleSongFinishedPlaying}
        />
      </div>
    )
  } else {
    null
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
