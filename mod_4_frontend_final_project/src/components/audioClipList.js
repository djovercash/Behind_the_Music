import React from 'react'
import AudioItem from './audioItem'

const AudioClipList = (props) => {
  const audioClips = props.clips
  return (
    <div id='audioClipList'>
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
