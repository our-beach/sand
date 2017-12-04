import Context from './Context'
import createBuffer from './createBuffer'
import rampTable from './rampTable'
import isFirefox from '../browser/isFirefox'

const rampWithRamper = (node, targetVal, duration) => {
  const scale = 0.1
  const ramper = Context.createBufferSource()
  const data = rampTable(node.gain.value, targetVal, Math.round(44100 * duration * scale))
  const buffer = createBuffer(data)

  ramper.buffer = buffer
  ramper.loop = false
  ramper.playbackRate.value = scale
  ramper.connect(node.gain)

  ramper.onended = () => {
    node.gain.value = targetVal
    ramper.disconnect(node.gain)
  }

  return ramper.start()
}

export default (node, target, duration) => {
  if (isFirefox)
    return rampWithRamper(node, target, duration)
  else
    return node.gain.linearRampToValueAtTime(target, Context.currentTime + duration)
}
