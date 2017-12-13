export const logarithmicScaleToFrequency = (power, arb = 20) =>
  (Math.pow(2, power) * arb).toFixed(2)

export const frequencyToLogarithmicScale = (frequency, arb = 20) =>
   Math.log2(frequency/arb)
