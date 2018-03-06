import React from 'react'

const LoadedClipEdit = (props) => {
  return (
    <div className="AudioClip">
      <form id="editForm" onSubmit={props.updateClip}>
        <h2>EDIT YOUR CLIP</h2>
        <div className="signupInput">
        <h3>Title: </h3>
        <input type="text" name="title" placeholder={props.clip.title} onChange={props.updateTitle}/>
        </div>
        <div className="signupInput">
        <h3>Artist: </h3>
        <input type="text" name="artist" placeholder={props.clip.artist} onChange={props.updateArtist}/>
        </div>
        <br/ >
        <input id="submit" type="submit" value="Submit" />
      </form>
      <input id="delete" type="submit" onClick={props.deleteClip} value="Delete Clip"/>
    </div>
  )
}

export default LoadedClipEdit
