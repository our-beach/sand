import React from 'react'
import Oscilloscope from './Oscilloscope'
import Controls from './Controls'

const WoolyWilly = ({
  amplitudes,
  width,
  height,
  onGestureStart,
  onMove,
  frequency,
  onSetFrequency,
  muted,
  onToggleMute,
}) => {
  return (
    <div className="wooly-willy">
      <Oscilloscope
        amplitudes={amplitudes}
        width={width}
        height={height}
        onGestureStart={onGestureStart}
        onMove={onMove}
      />
      <Controls
        frequency={frequency}
        onSetFrequency={onSetFrequency}
        muted={muted}
        onToggleMute={onToggleMute}
      />
    </div>
  )
}

export default WoolyWilly
