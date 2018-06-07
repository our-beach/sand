import React from 'react'
import { logarithmicScaleToFrequency } from '../math'
import { frequencyToLogarithmicScale } from '../math'
import { InputNumber, Slider } from 'antd'
import Mute from './Mute'

const addHertzLabel = value => `${value} Hz`
const removeHertzLabel = value => value.replace(/[^\d.]/g, '')

const Controls = ({
  frequency,
  onSetFrequency,
  muted,
  onToggleMute,
}) => {
  return (
    <div className="controls">
      <InputNumber
        className="field"
        value={frequency}
        onChange={value => !isNaN(value) && onSetFrequency(value)}
        formatter={addHertzLabel}
        parser={removeHertzLabel}
      />
      <Mute
        className="mute"
        muted={muted}
        onToggleMute={onToggleMute}
      />
      <Slider
        className="slider"
        min={0}
        max={10}
        step={0.0001}
        value={frequencyToLogarithmicScale(frequency)}
        onChange={value => onSetFrequency(logarithmicScaleToFrequency(value))}
        tipFormatter={null}
      />
    </div>
  )
}

export default Controls

