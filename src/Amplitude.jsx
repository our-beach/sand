import React from 'react'
import {
  Rect,
} from 'react-konva'

const Amplitude = ({ x, y }) => {
  return (
    <Rect
      x={x}
      y={y}
      fill={'#F00'}
      width={2}
      height={2}
    />
  )
}

export default Amplitude
