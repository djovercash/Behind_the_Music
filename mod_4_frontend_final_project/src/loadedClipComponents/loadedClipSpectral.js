import React from 'react'
import * as d3 from 'd3'

class LoadedClipSpectral extends React.Component {

  width = 760
  height = 360

  x = d3.scaleLinear()
    .domain([0, 512])
    .range([3, this.width - 256]);

  y = d3.scaleLinear()
    .domain([0, 255])
    .range([this.height + 4, 5]);

  colors = d3.scaleLinear()
    .domain([0, 25, 75, 140, 220])
    .range(['white', 'yellow', 'orange', 'orange', 'red']);

  componentDidMount() {
    this.canvas = this.refs.spectralCanvas
    this.canvasCtx = this.canvas.getContext("2d");
    this.canvasCtx.fillStyle = 'rgb(33, 33, 33)';
    this.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    this.canvasCtx.lineWidth = .1;
    this.draw()
  }

  componentDidUpdate() {
    // const canvas = d3.select(this.refs.spectralCanvas)
  }

  draw = () => {
    this.props.analyser.getByteFrequencyData(this.props.dataArray)
    this.canvasCtx.fillStyle = 'rgb(33, 33, 33)';
    this.canvasCtx.fillRect(0, 0, this.width, this.height);
    for (let i in this.props.dataArray) {
      this.canvasCtx.beginPath();
      this.canvasCtx.fillStyle = this.colors(this.props.dataArray[i]);
      this.canvasCtx.arc(this.x(i), this.y(this.props.dataArray[i]), 3, 0, 2*Math.PI);
      this.canvasCtx.fill();
      this.canvasCtx.stroke();
    }
    requestAnimationFrame(this.draw);
  }


  render () {
    return (
      <canvas ref="spectralCanvas" id="spectralCanvas" width={this.width} height={this.height} ></canvas>
    )
  }
}

export default LoadedClipSpectral
