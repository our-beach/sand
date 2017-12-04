export default beeper => {
  beeper.source.stop()
  beeper.gainNode.disconnect()
  beeper.source.disconnect()
}
