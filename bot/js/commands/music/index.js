export const queue = []

export let playing = false

function run() {
    if (!queue.length) return playing = false
    const [audio, resolve, reject] = queue.shift()
    audio.addEventListener('error', run)
    audio.addEventListener('ended', run)
    audio.play().then(resolve).catch(reject)
    playing = audio
}

function push(url) {
    const {promise, resolve, reject} = Promise.withResolvers()
    queue.push([new Audio(url), resolve, reject])
    return promise
}

export function play(client, {message_id: reply_parent_message_id}, url) {
    if (playing?.paused) {
        client.sendChatMessage({
            message: 'Resuming song...',
            reply_parent_message_id
        })
        playing.play()
    }

    if (!url)
        return client.sendChatMessage({
            message: '!play <url>',
            reply_parent_message_id
        })
    push(url)
        .then(() => client.sendChatMessage({
            message: 'Now playing...',
            reply_parent_message_id
        }))
        .catch(error => client.sendChatMessage({
            message: error.toString(),
            reply_parent_message_id
        }))
    if (!playing)
        run()
}

export function pause(client, {message_id: reply_parent_message_id}, argument) {
    if (!playing)
        return client.sendChatMessage({
            message: 'Nothing to pause!',
            reply_parent_message_id
        })
    playing.pause()
    client.sendChatMessage({
        message: 'Pausing...',
        reply_parent_message_id
    })
}

export function skip(client, {message_id: reply_parent_message_id}, argument) {
    if (!playing)
        return client.sendChatMessage({
            message: 'Nothing to skip!',
            reply_parent_message_id
        })
    const all = argument === 'all'
    const count = all ? queue.length + 1 : 1
    client.sendChatMessage({
        message: `Skipping ${count} song${count === 1 ? '' : 's'}...`,
        reply_parent_message_id
    })
    playing.src = ''
    if (all) queue.length = 0
    run()
}