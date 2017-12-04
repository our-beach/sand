import Context from './Context'
import { FUNDAMENTAL, SAMPLE_RATE } from './constants'

export default data => {
  const buffer = Context.createBuffer(1, data.length, SAMPLE_RATE);

  for (var channel = 0; channel < buffer.numberOfChannels; channel++) {
    var nowBuffering = buffer.getChannelData(channel)
    for (var i = 0; i < buffer.length; i++) {
      if (data[i] !== null)
        nowBuffering[i] = data[i]
    }
  }

  return buffer
}
