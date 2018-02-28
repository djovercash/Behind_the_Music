import React from 'react'
import AudioItem from './audioItem'

const AudioClipList = (props) => {
  const audioClips = props.clips
  return (
    <div>
      {audioClips.map(clip => {
        return <AudioItem key={clip.id} clip={clip} />
      })}
    </div>
  )
}

export default AudioClipList
