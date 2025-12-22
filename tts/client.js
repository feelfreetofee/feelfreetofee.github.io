import {Twitch} from './twitch'

export const client = new Twitch({
    client_id: 'zqkahqvy718q2gg8gmq2853umi0snj',
    token: localStorage.getItem('tts_twitch_token'),
    scopes: ['user:read:chat', 'user:write:chat']
})

client.addEventListener('session_welcome', function({data}) {
    this.subscriptions({
        type: 'channel.chat.message',
        version: '1',
        condition: {
            broadcaster_user_id: client.user_id,
            user_id: client.user_id
        },
        transport: {
            method: 'websocket',
            session_id: data.payload.session.id
        }
    })
})


