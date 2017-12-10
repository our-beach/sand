import React from 'react'
import {
  Layer,
  Stage,
} from 'react-konva'
import Waveform from './Waveform'
import Frequency from './Frequency'
import './WoolyWilly.css'

const WoolyWilly = ({
  amplitudes,
  frequency,
  width,
  height,
  onMouseDown,
  onMouseUp,
  onMove,
  onSetFrequencyByField,
  onSetFrequencyBySlider
}) => {
  const stepSize = width / amplitudes.length
  const y = (height - 10) / 2
  const waveformPoints = amplitudes.map(({ value }, idx) => ({
    x: idx * stepSize, y: (1 - value) * y
  }));

  return (
    <div>
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
      <Frequency
        frequency={frequency}
        onSetFrequencyByField={onSetFrequencyByField}
        onSetFrequencyBySlider={onSetFrequencyBySlider}
        />
    </div>
  )
}

export default WoolyWilly
