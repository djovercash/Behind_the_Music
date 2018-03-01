import React from 'react'
import AudioClipList from './audioClipList'
import AudioClip from './audioClip'

const BASEURL = 'http://localhost:3000/clips'

class AudioContainer extends React.Component {

  state = {
    clips: [],
    loaded_clip: {
      id: null,
      url: '',
      title: '',
      artist: ''
    }
  }

  fetchClips() {
    return fetch(BASEURL).then(res => res.json())
  }

  componentDidMount() {
    this.fetchClips()
    .then(data => {
      this.setState({
        clips: data
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

  render() {
    return (
      <div id="audioContainer">
        <div id="userAudioClips">
          <AudioClipList clips={this.state.clips} findAudioFile={this.findAudioFile}/>
        </div>
        <div id="playAudioClip">
          <h5>Play shit here</h5>
          <AudioClip clip={this.state.loaded_clip}/>
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
