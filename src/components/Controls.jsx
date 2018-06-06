import React from 'react'
import { logarithmicScaleToFrequency } from '../math'
import { frequencyToLogarithmicScale } from '../math'
import { Row, Col, InputNumber, Slider } from 'antd'
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
    <Row
      className="controls"
      gutter={16}
    >
      <Col span={3}>
        <InputNumber
          className="field"
          value={frequency}
          onChange={value => !isNaN(value) && onSetFrequency(value)}
          formatter={addHertzLabel}
          parser={removeHertzLabel}
        />
      </Col>
      <Col xs={24} md={19}>
        <Slider
          className="slider"
          min={0}
          max={10}
          step={0.0001}
          value={frequencyToLogarithmicScale(frequency)}
          onChange={value => onSetFrequency(logarithmicScaleToFrequency(value))}
          tipFormatter={null}
        />
      </Col>
      <Col span={2}>
        <Mute
          muted={muted}
          onToggleMute={onToggleMute}
        />
      </Col>
    </Row>
  )
}

export default Controls

