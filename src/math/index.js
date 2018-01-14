export const logarithmicScaleToFrequency = (power, fundamental = 20) =>
  parseFloat((Math.pow(2, power) * fundamental).toFixed(2))

export const frequencyToLogarithmicScale = (frequency, fundamental = 20) =>
  Math.log2(frequency/fundamental)

export const leastOf = (a, b) => a < b ? a : b