import React from 'react'
import UserClipItem from './userClipItem'

const UserClipsList = (props) => {
  const audioClips = props.clips
  return (
    <div>
      {audioClips.map(clip => {
        return (
          <div key={clip.id}>
            <UserClipItem clip={clip} findAudioFile={props.findAudioFile}/>
          </div>
        )
      })}
    </div>
  )
}

export default UserClipsList
