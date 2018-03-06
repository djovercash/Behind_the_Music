import React from 'react'
import OrangeForm from './orangeform.jpg'
import * as d3 from 'd3'

class LoadedClipWave extends React.Component {

  pathStyle = {
    'stroke': 'orange',
    'fillOpacity': '0',
  };

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
          <h1>Select a Clip</h1>
          <button> ▶ </button><button> ◼ </button>
          <img id="demoWave" src={OrangeForm} />
        </div>
      )
    } else {
      return (
        <div className="loadedClipWave">
          <h1>{this.props.clip.title} | {this.props.clip.artist !== "" ? this.props.clip.artist : "Unknown"}</h1>
          <button onClick={this.props.playClip}> ▶ </button><button onClick={this.props.stopClip}> ◼ </button>
          <button onClick={this.props.editSongSelection}>Edit Song</button>
            <svg width="760" height="200" id="waveform">
              <g id="waveShape" ref="waveGroup">
                <path
                  className="wave"
                  transform="translate(0,10)"
                  style={this.pathStyle}
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
