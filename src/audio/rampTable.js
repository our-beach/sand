export default (start, end, length) => {
  const output = Array(length)
  const delta = end - start
  const step = delta / length

  for (let i = 0; i < length; i++) {
    output[i] = (step * i) + start
  }

  return output
}
