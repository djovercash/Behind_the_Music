import React from 'react'
import AudioClipList from './audioClipList'
import AudioClip from './audioClip'
import AudioClipUpload from './audioClipUpload'
import filestack from 'filestack-js';

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

  componentDidMount() {
    let clips = this.props.clips
    this.setState({
      clips: [...clips]
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
