const video = document.body.createElement('video', {
    autoplay: true
})

await navigator.mediaDevices.getUserMedia({
    video: true
})
.then(stream => {
    video.srcObject = stream;
})