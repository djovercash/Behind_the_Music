import React from 'react'
import UserClipItem from './userClipItem'

const UserClipsList = (props) => {
  const audioClips = props.clips
  return (
    <div id="userClipsList">
      <h3>Your Current Clips</h3>
      {audioClips.map(clip => {
        return (
          <div key={clip.id}>
            <UserClipItem clip={clip} findAudioFile={props.findAudioFile}/>
          </div>
        )
      })}
      <button onClick={props.uploadClip}>Upload Audio Clip</button>
    </div>
  )
}

export default UserClipsList
