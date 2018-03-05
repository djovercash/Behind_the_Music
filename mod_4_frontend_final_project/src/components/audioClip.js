import React from 'react'
import AudioClipUpdate from './audioClipUpdate'
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
import * as d3 from "d3";

// import Sound from 'react-sound';
// import AudioClipUpdate from './audioClipUpdate'
// import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
//
// const renderAudioClip = (props) => {
//   if (props.clip.url !== "") {
//     return (
//       <Router>
//         <div className="AudioClip">
//           <h3>{props.clip.title} | {props.clip.artist !== "" ? props.clip.artist : "Unknown"}</h3>
//           <Switch>
//             <Route path="/tracks/:id" render={(routerParams) => {
//               return <AudioClipUpdate id={props.clip.id} onClick={props.editSongSelection}/>
//             }}/>
//           </Switch>
//           <button id={props.clip.id} onClick={props.editSongSelection} value="Edit Song"><NavLink to="/tracks/:id" exact value="Edit Song">Edit Song</NavLink></button>
//           <Sound
//            url={props.clip.url}
//            playStatus={Sound.status.PLAYING}
//            playFromPosition={300}
//            onLoading={this.handleSongLoading}
//            onPlaying={this.handleSongPlaying}
//            onFinishedPlaying={this.handleSongFinishedPlaying}
//           />
//         </div>
//       </Router>
//     )
//   }
// }
//
// const AudioClip = (props) => {
//   return (
//     <div>
//       {renderAudioClip(props)}
//     </div>
//   )
// import Sound from 'react-sound';

// MO BELOW

// import * as d3 from "d3";
//
//
// var width = 940;
// var height = 230;
// // var waveHeight = 200;
//
//
// class AudioClip extends React.Component {
//
//
//   componentDidMount() {
//     // this.d3Node = d3.select(ReactDOM.findDOMNode(this))
//     //   .datum(this.props.waveData)
//       // .call(enterNode);
//       // console.log(this.wavePath)
//
//
//     // this.newPath = d3.select(document.createElement('path'))
//     //   .attr("class", "wave")
//     //   .attr("transform", "translate(0,30)")
//     // console.log(this.waveShape);
//     // console.log(this.newPath.node());
//     // this.waveShape.appendChild(this.newPath.node())
//
//     // d3.select(this.refs.wavePath).datum(waveData).attr("d",line)
//   }
//
//   componentDidUpdate() {
//     // this.newPath.datum(this.props.waveData).attr("d",this.props.line)
//       // .call(updateNode);
//     d3.select(this.refs.wavePath).datum(this.props.waveData).attr("d",this.props.line)
//   }
//   //
//   // const svg = document.createElement('svg', {width: 940, height: 230})
//   //
//   // const waveShape = svg.append("g")
//   //   .attr("id", "waveShape")
//   //   .append("path")
//   //   .attr("class", "wave")
//   //   .attr("transform", "translate(0,30)")
//   //
//   // waveShape.datum(this.props.waveData).attr("d",this.props.line)
//
//   render () {
//     // console.log(this.props)
//
//     return (
//       <div>
//         <span onClick={this.props.playClip}>▶</span><span onClick={this.props.stopClip}>◼</span>
//         <h3>{this.props.clip.title}</h3>
//         {/* {svg} */}
//         <svg width={width} height={height}>
//           <g id="waveShape" ref="waveGroup">
//             <path
//               className="wave"
//               transform="translate(0,30)"
//               ref="wavePath"
//             />
//             {/* <path className="line shadow" d={line(data)} strokeLinecap="round"/> */}
//             {/* this.wavePath.datum(this.props.waveData).attr('d',this.props.line) */}
//           </g>
//         </svg>
//         {/* <Sound
//          url={props.clip.url}
//          playStatus={Sound.status.PLAYING}
//          playFromPosition={0}
//          onLoading={this.handleSongLoading}
//          onPlaying={this.handleSongPlaying}
//          onFinishedPlaying={this.handleSongFinishedPlaying}
//         /> */}
//       </div>
//     )
//   }
//
// }

//MERGING OF SHIT

//
// var width = 940;
// var height = 230;
// var waveHeight = 200;

const width = 800;
const height = 200;

class AudioClip extends React.Component {

  componentDidUpdate() {
    d3.select(this.refs.wavePath).datum(this.props.waveData).attr("d",this.props.line)
  }

  render () {
    // console.log(this.props)
    // if (this.props.loaded_clip.url !== '') {
      return (
        <Router>
          <div id="audioClip">
            <h3 id='clipName'>{this.props.clip.title} | {this.props.clip.artist !== "" ? this.props.clip.artist : "Unknown"}</h3>
            <div id='transport'>
              <span onClick={this.props.playClip}>▶</span><span onClick={this.props.stopClip}>◼</span>
            </div>
            <Switch>
                <Route path="/tracks/:id" render={(routerParams) => {
                  return <AudioClipUpdate id={this.props.clip.id} onClick={this.props.editSongSelection}/>
                }}/>
            </Switch>
            <button id={this.props.clip.id} className="AudioClipUpdate" onClick={this.props.editSongSelection} value="Edit Song"><NavLink to="/tracks/:id" exact value="Edit Song">Edit Song</NavLink></button>
            <svg width={width} height={height} id='waveform'>
              <g id="waveShape" ref="waveGroup">
                <path
                  className="wave"
                  transform="translate(0,30)"
                  ref="wavePath"
                />
              </g>
            </svg>
          </div>
        </Router>
      )
    // }
  }

}

export default AudioClip
