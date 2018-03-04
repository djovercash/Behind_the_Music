import React from 'react'
import AudioItem from './audioItem'
import {NavLink} from 'react-router-dom'

const AudioClipList = (props) => {
  const audioClips = props.clips
  return (
    <div>
      {audioClips.map(clip => {
        return (
          <div key={clip.id}>
            <AudioItem clip={clip} findAudioFile={props.findAudioFile}/>
          </div>
        )
      })}
    </div>
  )
}

export default AudioClipList
