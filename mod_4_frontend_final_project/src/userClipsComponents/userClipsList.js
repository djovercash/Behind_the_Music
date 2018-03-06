import React from 'react'
import UserClipItem from './userClipItem'

const UserClipsList = (props) => {
  const audioClips = props.clips
  return (
    <div id="userClipsList">
      <h3>Your Current Clips</h3>
      <div id="clipList">
        {audioClips.map(clip => {
          return <UserClipItem clip={clip} key={clip.id} findAudioFile={props.findAudioFile}/>
        })}
      </div>
      <button style={{"bottom": 0}} onClick={props.uploadClip}>Upload Audio Clip</button>
    </div>
  )
}

export default UserClipsList
