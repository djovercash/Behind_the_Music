import React from 'react'

const AudioClipUpload = (props) => {
  return (
    <input type="BUTTON" value="Upload Audio Clip" id="uploadAudioClip" onClick={props.uploadClip}/>
  )
}

export default AudioClipUpload
