import React from 'react'
import {
  Path,
} from 'react-konva'

const moveTo = ({ x, y }) => `M${x},${y}`;

const lineTo = ({ x, y }) => `L${x},${y}`;

const linesBetween = points =>
      points.reduce((result, point) => result + lineTo(point), '');

const deriveLine = ([head, ...points]) =>
      moveTo(head) + linesBetween(points);

export default props => (
  <Path
    className="waveform"
    data={deriveLine(props.points)}
    stroke="#ff5252"
  />
)