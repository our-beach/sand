import React from 'react'
import {
  Layer,
  Stage,
} from 'react-konva'
import Amplitude from './Amplitude'

const WoolyWilly = ({ amplitudes, width, height, onMouseDown, onMouseUp, onMove }) => {
  const stepSize = width / amplitudes.length
  const y = (height - 10) / 2

  return (
    <Stage
      width={width}
      height={height}
      onContentMousedown={onMouseDown}
      onContentMouseup={onMouseUp}
      onContentMousemove={onMove}
    >
      <Layer>
        {amplitudes.map(({ value }, index) =>
          <Amplitude key={index} x={index * stepSize} y={(1 - value) * y} />
        )}
      </Layer>
    </Stage>
  )
}

export default WoolyWilly
