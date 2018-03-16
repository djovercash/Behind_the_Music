import React from 'react'
import UserClipsList from '../userClipsComponents/userClipsList'
import LoadedClipContainer from '../loadedClipComponents/loadedClipContainer'
import filestack from 'filestack-js';

const BASEURL = 'http://localhost:3000/clips'
const API_KEY = //You need an API KEY from Filestack

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
    edit_song: false,
  }

  componentDidMount() {
    let clips = this.props.clips
    this.setState({
      clips: [...clips]
    })
  }

  findAudioFile = (event) => {
    if (this.refs.loadedClip.source) {
      this.refs.loadedClip.source.stop()
    }
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
    }, () => this.refs.loadedClip.loadClip())
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

    uploadClip = (event) => {
      const client = filestack.init(API_KEY)
      client.pick({}).then(res => {
        let files = res.filesUploaded
        files.forEach(file => {
          this.fetchCreateBackendItem(file)
          .then(clip => {
            this.setState({
              clips: [...this.state.clips, clip],
            })
          })
        })
      })
    }

  editSongSelection = (event) => {
    event.preventDefault()
    if (this.refs.loadedClip.source) {
      this.refs.loadedClip.source.stop()
    }
    this.setState({
        edit_song: true
    })
  }

  endEdit = (event) => {
    event.preventDefault()
    this.setState({
      edit_song: false
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

  sortAscClips = (event) => {
    let clips = this.state.clips
    clips.sort(function(a, b) {
      var titleA = a.title.toUpperCase(); // ignore upper and lowercase
      var titleB = b.title.toUpperCase(); // ignore upper and lowercase
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    })
    this.setState({
      clips: [...clips]
    })
  }

  sortDescClips = (event) => {
    let clips = this.state.clips
    clips.sort(function(a, b) {
      var titleA = a.title.toUpperCase(); // ignore upper and lowercase
      var titleB = b.title.toUpperCase(); // ignore upper and lowercase
      if (titleA > titleB) {
        return -1;
      }
      if (titleA < titleB) {
        return 1;
      }
      return 0;
    })
    this.setState({
      clips: [...clips]
    })
  }

  render() {
    return (
      <div id="audioContainer">
        <UserClipsList clips={this.state.clips} sortAscClips={this.sortAscClips} sortDescClips={this.sortDescClips} findAudioFile={this.findAudioFile} uploadClip={this.uploadClip}/>
        <LoadedClipContainer ref="loadedClip" updateClip={this.updateClip} endEdit={this.endEdit} updateTitle={this.updateTitle} updateArtist={this.updateArtist} stopEdit={this.stopEdit} deleteClip={this.deleteClip} clip={this.state.loaded_clip} edit_song={this.state.edit_song} editSongSelection={this.editSongSelection}/>
      </div>
    )
  }
}

export default AudioContainer
