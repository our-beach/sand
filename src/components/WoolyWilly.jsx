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
  onGestureStart,
  onGestureEnd,
  onMove,
  onSetFrequency,
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
        onContentMousedown={e => onGestureStart([e.evt.layerX, e.evt.layerY])}
        onContentMouseup={e => onGestureEnd()}
        onContentMousemove={e => onMove([
          e.evt.layerX,
          e.evt.layerY
        ])}
        onContentTouchstart={e => onGestureStart([
          e.evt.targetTouches[0].clientX,
          e.evt.targetTouches[0].clientY,
        ])}
        onContentTouchend={e => onGestureEnd()}
        onContentTouchmove={e => onMove([
          e.evt.targetTouches[0].clientX,
          e.evt.targetTouches[0].clientY,
        ])}
      >
        <Layer>
          <Waveform points={waveformPoints} />
        </Layer>
      </Stage>
      <Frequency
        frequency={frequency}
        onSetFrequency={onSetFrequency}
      />
    </div>
  )
}

export default WoolyWilly
