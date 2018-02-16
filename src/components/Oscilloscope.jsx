import React from 'react'
import {
  Layer,
  Stage,
} from 'react-konva'
import Waveform from './Waveform'

const Oscilloscope = ({
  amplitudes,
  width,
  height,
  onGestureStart,
  onMove,
}) => {
  const stepSize = width / amplitudes.length
  const y = (height - 10) / 2
  const waveformPoints = amplitudes.map(({ value }, idx) => ({
    x: idx * stepSize, y: (1 - value) * y
  }));

  return (
    <Stage className="oscilloscope"
      width={width}
      height={height}
      onContentMousedown={e => onGestureStart([e.evt.layerX, e.evt.layerY])}
      onContentMousemove={e => onMove([
        e.evt.layerX,
        e.evt.layerY
      ])}
      onContentTouchstart={e => onGestureStart([
        e.evt.targetTouches[0].clientX,
        e.evt.targetTouches[0].clientY,
      ])}
      onContentTouchmove={e => onMove([
        e.evt.targetTouches[0].clientX,
        e.evt.targetTouches[0].clientY,
      ])}
    >
      <Layer>
        <Waveform points={waveformPoints}/>
      </Layer>
    </Stage>
  )
}

export default Oscilloscope
