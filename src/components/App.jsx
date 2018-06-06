import React from 'react'
import WoolyWilly from './WoolyWilly'

const App = ({
  amplitudes,
  width,
  height,
  onGestureStart,
  onGestureEnd,
  onMove,
  frequency,
  onSetFrequency,
  muted,
  onToggleMute,
}) => {
  return (
    <div
      id="app"
      onMouseUp={e => onGestureEnd()}
      onTouchEnd={e => onGestureEnd()}
    >
      <WoolyWilly
        amplitudes={amplitudes}
        width={width}
        height={height}
        onGestureStart={onGestureStart}
        onMove={onMove}
        frequency={frequency}
        onSetFrequency={onSetFrequency}
        muted={muted}
        onToggleMute={onToggleMute}
      />
    </div>
  )
}

export default App
