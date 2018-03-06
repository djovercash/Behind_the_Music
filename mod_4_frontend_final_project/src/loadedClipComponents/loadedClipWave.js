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
        <div id="loadedClipWave">
          <h3>{this.props.clip.title} | {this.props.clip.artist !== "" ? this.props.clip.artist : "Unknown"}</h3>
          <span onClick={this.props.playClip}> ▶ </span><span onClick={this.props.stopClip}> ◼ </span>
          <button onClick={this.props.editSongSelection}>Edit Song</button>
            <svg width="800" height="200">
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
      this.whatToRender()
    )
  }
}

export default LoadedClipWave
