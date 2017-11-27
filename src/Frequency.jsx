import React from 'react'

const Frequency = ({ frequency, onSetFrequency }) => {
  return (
    <div width="100%">
      <input
        className="frequency-slider"
        type="range"
        min="50"
        max="20000"
        step="0.05"
        style={{width: 700}}
        value={frequency}
        onChange={onSetFrequency}
      />
      <input
        className="frequency-field"
        min="50"
        max="20000"
        step="0.05"
        value={frequency}
        onChange={onSetFrequency}
      />
    </div>
  )
}

export default Frequency
