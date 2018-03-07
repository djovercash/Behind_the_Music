import React from 'react'
import UserClipItem from './userClipItem'
import UserClipFilter from './userClipFilter'

class UserClipsList extends React.Component {
  state = {
    filter: ''
  }

  filterClips = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  render() {
    const audioClips = this.props.clips.filter(clip => clip.title.toUpperCase().includes(this.state.filter.toUpperCase()))
    return (
      <div id="userClipsList">
        <h3>Your Current Clips</h3>
        <UserClipFilter sortAscClips={this.props.sortAscClips} sortDescClips={this.props.sortDescClips} filterClips={this.filterClips} />
        <div id="clipList">
          {audioClips.map(clip => {
            return <UserClipItem clip={clip} key={clip.id} findAudioFile={this.props.findAudioFile}/>
          })}
        </div>
        <button style={{"bottom": 0}} onClick={this.props.uploadClip}>Upload Audio Clip</button>
      </div>
    )
  }
}

export default UserClipsList
