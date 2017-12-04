import Context from './Context'
import isFirefox from '../browser/isFirefox'

export default (node, value) => {
  if (isFirefox)
    return node.gain.value = value
  else
    return node.gain.setValueAtTime(value, Context.currentTime)
}
