import React from 'react'
import UserClipsList from '../userClipsComponents/userClipsList'
import LoadedClipContainer from '../loadedClipComponents/loadedClipContainer'

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

  editSongSelection = (event) => {
    event.preventDefault()
    console.log("here0")
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

  updateClip = (event) => {
    event.preventDefault()
    let title = this.state.loaded_clip.title
    let artist = this.state.loaded_clip.artist
    let nonEditedClips = this.state.clips.filter(clip => clip.id !== this.state.loaded_clip.id)
    this.fetchUpdateBackendItem(title, artist)
    .then(data => {
      this.setState({
        edit_song: false,
        clips:[...nonEditedClips, data]
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

  fetchDeleteClipBackend() {
    return fetch(`${BASEURL}/${this.state.loaded_clip.id}`, {
      method: 'DELETE'
    })
  }

  render() {
    return (
      <div>
        <UserClipsList clips={this.state.clips} findAudioFile={this.findAudioFile}/>
        <LoadedClipContainer updateClip={this.updateClip} updateTitle={this.updateTitle} updateArtist={this.updateArtist} stopEdit={this.stopEdit} deleteClip={this.deleteClip} clip={this.state.loaded_clip} edit_song={this.state.edit_song} editSongSelection={this.editSongSelection}/>
      </div>
    )
  }
}

export default AudioContainer
