import React from 'react'
import Sound from 'react-sound';

const AudioClip = (props) => {
  return (
    <div>
      <h3>{props.clip.title}</h3>
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
}

export default AudioClip
