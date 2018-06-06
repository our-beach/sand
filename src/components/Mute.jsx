import React from 'react'

const Mute = ({ muted, onToggleMute }) => {
  return (
    <i className="material-icons" style={{ fontSize: 32 }} onClick={onToggleMute}>
      { muted ? 'volume_off' : 'volume_up' }
    </i>
  )
}

export default Mute
