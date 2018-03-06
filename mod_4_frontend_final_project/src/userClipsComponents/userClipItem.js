import React from 'react'


const UserClipItem = (props) => {
  return (
    <li id={props.clip.id} onClick={props.findAudioFile}>{props.clip.title.length > 15 ? props.clip.title.substring(0, 15) + "..." : props.clip.title}</li>
  )
}

export default UserClipItem
