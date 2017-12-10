import React from 'react'
import {
  Layer,
  Stage,
} from 'react-konva'
import Waveform from './Waveform'
import './WoolyWilly.css'

const WoolyWilly = ({ amplitudes, width, height, onMouseDown, onMouseUp, onMove }) => {
  const stepSize = width / amplitudes.length
  const y = (height - 10) / 2
  const waveformPoints = amplitudes.map(({ value }, idx) => ({
    x: idx * stepSize, y: (1 - value) * y
  }));

  return (
    <Stage
      className='Stage'
      width={width}
      height={height}
      onContentMousedown={onMouseDown}
      onContentMouseup={onMouseUp}
      onContentMousemove={onMove}
    >
      <Layer>
        <Waveform points={waveformPoints} />
      </Layer>
    </Stage>
  )
}

export default WoolyWilly
