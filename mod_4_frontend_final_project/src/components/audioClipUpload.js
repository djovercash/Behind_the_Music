import React from 'react'

const AudioClipUpload = (props) => {
  return (
    <button onClick={props.uploadClip} id='uploadClipButton'>Upload Audio Clip</button>
  )
}

export default AudioClipUpload
