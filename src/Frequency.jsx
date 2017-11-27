import React from 'react'

const frequencyToLogarithmicScale = (frequency, arb = 20) =>
  Math.log2(frequency/arb)

const Frequency = ({ frequency, onSetFrequencyByField, onSetFrequencyBySlider }) => {
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
        onChange={onSetFrequencyBySlider}
      />
      <input
        className="frequency-field"
        value={frequency}
        onChange={onSetFrequencyByField}
      />
    </div>
  )
}

export default Frequency
