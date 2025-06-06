import {image} from './app.js'

const audioContext = new AudioContext
const analyser = audioContext.createAnalyser()

const frequencies = new Uint8Array(analyser.frequencyBinCount)

function main() {
	analyser.getByteFrequencyData(frequencies)
	image.update(Math.max(...frequencies) / 255)
	requestAnimationFrame(main)
}

navigator.mediaDevices.getUserMedia({
	audio: {
		autoGainControl: false
	}
})
.then(mediaStream => main(
	audioContext.createMediaStreamSource(mediaStream).connect(analyser)
))
.catch(err => image.title = err)