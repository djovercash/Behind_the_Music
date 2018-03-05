import React from 'react'
import AudioClipList from './audioClipList'
import AudioClip from './audioClip'
import AudioClipUpload from './audioClipUpload'
import SpectralAnalysis from './spectralAnalysis'
import filestack from 'filestack-js';
import * as d3 from "d3";

const BASEURL = 'http://localhost:3000/clips'

class AudioContainer extends React.Component {

  state = {
    clips: [],
    loaded_clip: {
      id: null,
      url: '',
      title: '',
      artist: ''
    },
    waveData: null,
    line: null
    // source: null
  }






  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  source = null

  width = 940;
  height = 230;
  waveHeight = 200;
  timeScale = d3.scaleLinear().range([0, this.width]);
  analyser = this.audioCtx.createAnalyser();
  dataArray = new Uint8Array(this.analyser.fftSize/2);


  loadClip = () => {
    // this.setState({
    //   source: this.audioCtx.createBufferSource()
    // })
    this.source = this.audioCtx.createBufferSource();
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);

    fetch(this.state.loaded_clip.url)
    .then(function(response) { return response.arrayBuffer(); })
    .then(buffer => decodeBuffer(buffer));

    let decodeBuffer = (buffer) => {
      this.audioCtx.decodeAudioData(buffer, (decodedData) => {
        // console.log(decodedData);
        this.createWaveform(decodedData);
        this.source.buffer = decodedData;
      });
    }
  }

  playClip = (event) => {
    if (this.source) {this.source.stop()}
    this.loadClip();
    this.source.start(0);
    // event.target.setAttribute('disabled', 'disabled');
  }

  stopClip = (event) => {
    this.source.stop();
    // event.target.removeAttribute('disabled')
  }


  createWaveform = (buffer) => {
    console.log('original audioBuffer: ', buffer)
    // beatData = buffer;
    var waveData = buffer.getChannelData(0)
    console.log('audioBuffer channel data: ', waveData)
    var sampRateAdj = waveData.length > 1000000 ? 500 : 20
    waveData = waveData.filter(function(d,i) {return i % sampRateAdj === 0})
    console.log('reduced audioBuffer channel data: ', waveData)


    this.timeScale.domain([0, buffer.duration]);

    var line = d3.line()
        .x((d, i) => {return i/waveData.length * this.width})
        .y((d) => {return this.waveHeight/2 * d + this.waveHeight/2});

    this.setState({
      waveData: waveData,
      line: line
    })
  }














  componentDidMount() {
    let clips = this.props.clips
    clips.forEach(clip => {
      this.setState({
        clips: [clip]
      })
    })
  }

  findAudioFile = (event) => {
    let id = parseInt(event.target.id)
    let file = this.state.clips.filter(clip => clip.id === id)
    this.setState({
      loaded_clip: {
        id: file[0].id,
        url: file[0].url,
        title: file[0].title,
        artist: file[0].artist
      }
    })
  }

  uploadClip = (event) => {
    const client = filestack.init('AO1rF1TdISrSzbwTPEHFez')
    client.pick({}).then(res => {
      let files = res.filesUploaded
      files.forEach(file => {
        this.createBackendItem(file)
        .then(clip => {
          this.setState({
            clips: [...this.state.clips, clip]
          })
        })
      })
    })
  }

  createBackendItem(file) {
    return fetch(BASEURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: file.url,
        title: file.filename.split('.')[0],
        user_id: 1
      })
    }).then(res => res.json())
  }

  render() {
    return (
      <div id="audioContainer">
        <div id="uploadAudioClip" >
          <AudioClipUpload uploadClip={this.uploadClip}/>
        </div>
        <div id="userAudioClips">
          <AudioClipList clips={this.state.clips} findAudioFile={this.findAudioFile}/>
        </div>
        <div id="playAudioClip">
          <h5>Play shit here</h5>
          <AudioClip {...this.state} clip={this.state.loaded_clip} playClip={this.playClip} stopClip={this.stopClip}/>
        </div>
        <div id="Analysis">
          <SpectralAnalysis {...this.state} analyser={this.analyser} dataArray={this.dataArray} />
          <div className="specialAnalysis">
            <h5>Spatial Analysis</h5>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioContainer
