export const logarithmicScaleToFrequency = (power, arb = 20) =>
  (Math.pow(2, power) * arb).toFixed(2)
