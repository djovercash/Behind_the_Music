import React from 'react'

const LoadedClipEdit = (props) => {
  console.log(props.clip)
  return (
    <div className="AudioClip">
      <form onSubmit={props.updateClip}>
        <h2>Edit Your Clip Here</h2>
        <h3>Title: </h3>
        <input type="text" name="title" placeholder={props.clip.title} onChange={props.updateTitle}/>
        <h3>Artist: </h3>
        <input type="text" name="artist" placeholder={props.clip.artist} onChange={props.updateArtist}/><br/ >
        <input type="submit" value="submit" />
      </form>
      // <button onClick={props.stopEdit}>Home</button>
      <button onClick={props.deleteClip}>Delete Clip</button>
    </div>
  )
}

export default LoadedClipEdit
