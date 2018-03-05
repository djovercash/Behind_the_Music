import React from 'react'
import UserClipItem from './userClipItem'

const UserClipsList = (props) => {
  const audioClips = props.clips
  return (
    <div id="audioClipList">
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
