import context from './Context'

const createBufferPlayerNode = writeTo => {
  const processor = context.createScriptProcessor(1024, 1, 1)
  processor.onaudioprocess = event => writeTo(event.outputBuffer, 1024)
  return processor
}

export default createBufferPlayerNode
