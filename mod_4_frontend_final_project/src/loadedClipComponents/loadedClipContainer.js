import React from 'react'
import LoadedClipWave from './loadedClipWave'
import LoadedClipSpectral from './loadedClipSpectral'
import LoadedClipEdit from './loadedClipEdit'
import LoadedClipCircle from './loadedClipCircle'
import * as d3 from 'd3'

class LoadedClipContainer extends React.Component {

  state = {
    waveData: null,
    line: null,
    decodedData: null,
    display: true
  }

  componentWillMount() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.fftSize/2);
  }

  source = null
  width = 760;
  height = 200;
  waveHeight = 180;
  timeScale = d3.scaleLinear().range([0, this.width]);

  loadClip = () => {
    fetch(this.props.clip.url)
    .then(function(response) { return response.arrayBuffer(); })
    .then(buffer => decodeBuffer(buffer));

    let decodeBuffer = (buffer) => {
      this.audioCtx.decodeAudioData(buffer, (decodedData) => {
        this.createWaveform(decodedData);
        this.setState({
          decodedData: decodedData
        })
      });
    }
  }

  playClip = (event) => {
    if (this.source) {this.source.stop()}
    this.source = this.audioCtx.createBufferSource();
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
    this.source.buffer = this.state.decodedData
    this.source.start(0);
    this.setState({
      display: false
    })
  }

  stopClip = (event) => {
    this.source.stop();
    this.setState({
      display: true
    })
  }


  createWaveform = (buffer) => {
    var waveData = buffer.getChannelData(0)
    var sampRateAdj = waveData.length > 1000000 ? 1000 : 60
    waveData = waveData.filter(function(d,i) {return i % sampRateAdj === 0})

    this.timeScale.domain([0, buffer.duration]);

    var line = d3.line()
        .x((d, i) => {return i/waveData.length * this.width})
        .y((d) => {return this.waveHeight/2 * d + this.waveHeight/2});

    this.setState({
      waveData: waveData,
      line: line
    })
  }

  whatToRender() {
    if (!this.props.edit_song && !this.state.display) {
      return (
        <div id="loadedClipContainer">
          <LoadedClipWave {...this.state} clip={this.props.clip} playClip={this.playClip} stopClip={this.stopClip} editSongSelection={this.props.editSongSelection}/>
          <LoadedClipSpectral {...this.state} visible={this.state.display} clip={this.props.clip} analyser={this.analyser} dataArray={this.dataArray}/>
        </div>
      )
    } else if (!this.props.edit_song && this.state.display) {
      return (
        <div id="loadedClipContainer">
          <LoadedClipWave {...this.state} clip={this.props.clip} playClip={this.playClip} stopClip={this.stopClip} editSongSelection={this.props.editSongSelection}/>
          <LoadedClipCircle />
        </div>
      )
    } else {
      return (
        <div id="loadedClipContainer">
          <LoadedClipEdit clip={this.props.clip} updateClip={this.props.updateClip} updateTitle={this.props.updateTitle} updateArtist={this.props.updateArtist} deleteClip={this.props.deleteClip}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.whatToRender()}
      </div>
    )
  }
}

export default LoadedClipContainer
