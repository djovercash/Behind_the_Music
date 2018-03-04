import React from 'react'
import ReactDOM from 'react-dom';
import Sound from 'react-sound';
import * as d3 from "d3";


var width = 940;
var height = 230;
var waveHeight = 200;


class AudioClip extends React.Component {


  //FIXME:

  componentDidMount() {
    // this.d3Node = d3.select(ReactDOM.findDOMNode(this))
    //   .datum(this.props.waveData)
      // .call(enterNode);
      // console.log(this.wavePath)


    // this.newPath = d3.select(document.createElement('path'))
    //   .attr("class", "wave")
    //   .attr("transform", "translate(0,30)")
    // console.log(this.waveShape);
    // console.log(this.newPath.node());
    // this.waveShape.appendChild(this.newPath.node())

    // d3.select(this.refs.wavePath).datum(waveData).attr("d",line)
  }

  componentDidUpdate() {
    // this.newPath.datum(this.props.waveData).attr("d",this.props.line)
      // .call(updateNode);

    d3.select(this.refs.wavePath).datum(this.props.waveData).attr("d",this.props.line)
  }
  //
  // const svg = document.createElement('svg', {width: 940, height: 230})
  //
  // const waveShape = svg.append("g")
  //   .attr("id", "waveShape")
  //   .append("path")
  //   .attr("class", "wave")
  //   .attr("transform", "translate(0,30)")
  //
  // waveShape.datum(this.props.waveData).attr("d",this.props.line)

  render () {
    // console.log(this.props)

    return (
      <div>
        <span onClick={this.props.playClip}>▶</span><span onClick={this.props.stopClip}>◼</span>
        <h3>{this.props.clip.title}</h3>
        {/* {svg} */}
        <svg width={width} height={height}>
          <g id="waveShape" ref="waveGroup">
            <path
              className="wave"
              transform="translate(0,30)"
              ref="wavePath"
            />
            {/* <path className="line shadow" d={line(data)} strokeLinecap="round"/> */}
            {/* this.wavePath.datum(this.props.waveData).attr('d',this.props.line) */}
          </g>
        </svg>
        {/* <Sound
         url={props.clip.url}
         playStatus={Sound.status.PLAYING}
         playFromPosition={0}
         onLoading={this.handleSongLoading}
         onPlaying={this.handleSongPlaying}
         onFinishedPlaying={this.handleSongFinishedPlaying}
        /> */}
      </div>
    )
  }

}

export default AudioClip
