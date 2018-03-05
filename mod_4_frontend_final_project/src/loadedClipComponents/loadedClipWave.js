import React from 'react'
import * as d3 from 'd3'

class LoadedClipWave extends React.Component {

  componentDidUpdate() {
    d3.select(this.refs.wavePath).datum(this.props.waveData).attr("d",this.props.line)
  }

  whatToRender() {
    if (this.props.clip.title === '') {
      return (
        <h3>Select a Clip</h3>
      )
    } else {
      return (
        <div>
          <span onClick={this.props.playClip}>▶</span><span onClick={this.props.stopClip}>◼</span>
          <button onClick={this.props.editSongSelection}>Edit Song</button>
            <h3>{this.props.clip.title} | {this.props.clip.artist !== "" ? this.props.clip.artist : "Unknown"}</h3>
            <svg width="940" height="230">
              <g id="waveShape" ref="waveGroup">
                <path
                  className="wave"
                  transform="translate(0,30)"
                  ref="wavePath"
                />
              </g>
            </svg>
        </div>
      )
    }
  }

  render () {
    return (
      <div>
        {this.whatToRender()}
      </div>
    )
  }
}

export default LoadedClipWave
