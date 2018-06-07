import React from 'react'

const Mute = ({ className, muted, onToggleMute }) => {
  return (
    <div className={className}>
      <i className="material-icons" style={{ fontSize: 32 }} onClick={onToggleMute}>
        { muted ? 'volume_off' : 'volume_up' }
      </i>
    </div>
  )
}

export default Mute
