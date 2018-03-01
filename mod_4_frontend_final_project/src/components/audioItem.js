import React from 'react'

const AudioItem = (props) => {
  return (
    <li id={props.clip.id} onClick={props.findAudioFile}>{props.clip.title}</li>
  )
}

export default AudioItem
