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
}) => {
  return (
    <WoolyWilly
      amplitudes={amplitudes}
      width={width}
      height={height}
      onGestureStart={onGestureStart}
      onGestureEnd={onGestureEnd}
      onMove={onMove}
      frequency={frequency}
      onSetFrequency={onSetFrequency}
    />
  )
}

export default App
