import React from 'react'
import * as d3 from 'd3'

class LoadedClipWave extends React.Component {

  componentDidMount() {
    d3.select(this.refs.wavePath).datum(this.props.waveData).attr("d",this.props.line)
  }

  componentDidUpdate() {
    d3.select(this.refs.wavePath).datum(this.props.waveData).attr("d",this.props.line)
  }

  whatToRender() {
    if (this.props.clip.title === '') {
      return (
        <div className="loadedClipWave" id="clipNotLoaded">
          <h3>Select a Clip</h3>
          <button> ▶ </button><button> ◼ </button>
          <svg width="760" height="200" id="demoWave" >
            <g ref="waveGroup">
              <path
                className="wave"
                transform="translate(0,30)"
                ref="wavePath"
              />
            </g>
          </svg>
        </div>
      )
    } else {
      return (
        <div className="loadedClipWave">
          <h3>{this.props.clip.title} | {this.props.clip.artist !== "" ? this.props.clip.artist : "Unknown"}</h3>
          <button onClick={this.props.playClip}> ▶ </button><button onClick={this.props.stopClip}> ◼ </button>
          <button onClick={this.props.editSongSelection}>Edit Song</button>
            <svg width="760" height="200" id="waveform">
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
