import React from 'react'

const UserClipFilter = (props) => {
  return (
    <div id="filterClips">
      <input onChange={props.filterClips} placeholder="Type Clip Name"/>
      <div id="sortClips">
        <input type="submit" onClick={props.sortAscClips} value="ASC" />
        <input type="submit" onClick={props.sortDescClips} value="DESC" />
      </div>
    </div>
  )
}

export default UserClipFilter
