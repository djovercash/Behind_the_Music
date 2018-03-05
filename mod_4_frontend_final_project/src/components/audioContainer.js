import React from 'react'
import AudioClipList from './audioClipList'
import AudioClip from './audioClip'
import AudioClipUpload from './audioClipUpload'
import AudioClipUpdate from './audioClipUpdate'
import filestack from 'filestack-js';

const BASEURL = 'http://localhost:3000/clips'

class AudioContainer extends React.Component {

  state = {
    clips: [],
    loaded_clip: {
      id: null,
      url: '',
      title: '',
      artist: '',
      handle: ''
    },
    edit_song: false
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
        artist: file[0].artist,
        handle: file[0].handle
      }
    })
  }

  stopEdit = (event) => {
    console.log("Yo")
    this.setState({
      edit_song: false
    })
  }

  uploadClip = (event) => {
    const client = filestack.init('AO1rF1TdISrSzbwTPEHFez')
    client.pick({}).then(res => {
      let files = res.filesUploaded
      files.forEach(file => {
        console.log(file)
        this.fetchCreateBackendItem(file)
        .then(clip => {
          console.log(clip)
          this.setState({
            clips: [...this.state.clips, clip]
          })
        })
      })
    })
  }

  editSongSelection = (event) => {
    this.setState({
      edit_song: true
    })
  }

  updateTitle = (event) => {
    this.setState({
      loaded_clip: {
        ...this.state.loaded_clip,
        title: event.target.value
      }
    })
  }

  updateArtist = (event) => {
    this.setState({
      loaded_clip: {
        ...this.state.loaded_clip,
        artist: event.target.value
      }
    })
  }

  updateClip = (event) => {
    event.preventDefault()
    let title = this.state.loaded_clip.title
    let artist = this.state.loaded_clip.artist
    let nonEditedClips = this.state.clips.filter(clip => clip.id !== this.state.loaded_clip.id)
    this.fetchUpdateBackendItem(title, artist)
    .then(data => {
      this.setState({
        clips:[...nonEditedClips, data],
        edit_song: false
      })
    })
  }

  deleteClip = (event) => {
    event.preventDefault()
    let nonDeletedClips = this.state.clips.filter(clip => clip.id !== this.state.loaded_clip.id)
    this.fetchDeleteClipBackend()
    // const client = filestack.init('AO1rF1TdISrSzbwTPEHFez');
    // client.remove(this.state.loaded_clip.handle);
    this.setState({
      clips: [...nonDeletedClips],
      loaded_clip: {
        id: null,
        url: '',
        title: '',
        artist: '',
        handle: ''
      },
      edit_song: false
    })
  }

  fetchCreateBackendItem(file) {
    return fetch(BASEURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: file.url,
        title: file.filename.split('.')[0],
        user_id: this.props.user,
        handle: file.handle
      })
    }).then(res => res.json())
  }

  fetchUpdateBackendItem(title, artist) {
    return fetch(`${BASEURL}/${this.state.loaded_clip.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        artist: artist,
      })
    }).then(res => res.json())
  }

  fetchDeleteClipBackend() {
    return fetch(`${BASEURL}/${this.state.loaded_clip.id}`, {
      method: 'DELETE'
    })
  }

  audioToRender() {
    if (!this.state.edit_song) {
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
            <AudioClip editSongSelection={this.editSongSelection} clip={this.state.loaded_clip}/>
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
    } else {
      return (
        <div>
          <AudioClipUpdate clip={this.state.loaded_clip} updateClip={this.updateClip} updateTitle={this.updateTitle} updateArtist={this.updateArtist} stopEdit={this.stopEdit} deleteClip={this.deleteClip}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div id="audioContainer">
        {this.audioToRender()}
      </div>
    )
  }
}

export default AudioContainer
