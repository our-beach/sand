import Context from './Context'
import { SAMPLE_RATE } from './constants'
import rampAudioNode from './rampAudioNode'
import setNodeValue from './setNodeValue'
import createBuffer from './createBuffer'

export default (frequency, amplitude, data, rampDuration) => {
  const buffer = createBuffer(data);
  const source = Context.createBufferSource()
  const gainNode = Context.createGain()

  source.buffer = buffer
  source.loop = true
  source.playbackRate.value = (frequency / SAMPLE_RATE) * data.length
  source.connect(gainNode)
  gainNode.connect(Context.destination)

  setNodeValue(gainNode, 0.001)
  source.start()
  rampAudioNode(gainNode, amplitude, rampDuration)

  return {
    source: source,
    gainNode: gainNode
  }
}
