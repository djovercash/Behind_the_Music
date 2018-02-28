import React from 'react'


class AudioContainer extends React.Component {
  render() {
    return (
      <div id="audioContainer">
        <div id="userAudioClips">
          <h5>User Audio Clips</h5>
        </div>
        <div id="playAudioClip">
          <h5>Play shit here</h5>
          <h5>Wave</h5>
        </div>
        <div id="Analysis">
          <div className="specialAnalysis">
            <h5>Spatial Analysis</h5>
          </div>
          <div className="specialAnalysis">
            <h5>Spectral Analysis</h5>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioContainer
