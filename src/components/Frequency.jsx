import React from 'react'
import { logarithmicScaleToFrequency } from '../math'
import { frequencyToLogarithmicScale } from '../math'

const Frequency = ({ frequency, onSetFrequency }) => {
  return (
    <div width="100%">
      <input
        className="frequency-slider"
        type="range"
        min="0"
        max="10"
        step="0.0001"
        style={{width: 700}}
        value={frequencyToLogarithmicScale(frequency)}
        onChange={e => onSetFrequency(logarithmicScaleToFrequency(e.target.value))}
      />
      <input
        className="frequency-field"
        value={frequency}
        onChange={e => onSetFrequency(e.target.value)}
      />
    </div>
  )
}

export default Frequency
