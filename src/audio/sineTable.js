export default bufferLength => Array(bufferLength).fill(null).map((_, idx) => (
  Math.sin(idx * 2 * Math.PI / bufferLength)
))
