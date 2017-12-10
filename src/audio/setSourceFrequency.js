import { SAMPLE_RATE } from './constants'

export default (sourceNode, frequency, buffer) =>
  sourceNode.playbackRate.value = (frequency / SAMPLE_RATE) * buffer.length
