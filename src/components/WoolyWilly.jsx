import React from 'react'
import Oscilloscope from './Oscilloscope'
import Frequency from './Frequency'

const WoolyWilly = ({
  amplitudes,
  width,
  height,
  onGestureStart,
  onGestureEnd,
  onMove,
  frequency,
  onSetFrequency,
}) => {
  return (
    <div className="wooly-willy">
      <Oscilloscope
        amplitudes={amplitudes}
        width={width}
        height={height}
        onGestureStart={onGestureStart}
        onGestureEnd={onGestureEnd}
        onMove={onMove}
      />
      <Frequency
        frequency={frequency}
        onSetFrequency={onSetFrequency}
      />
    </div>
  )
}

export default WoolyWilly
