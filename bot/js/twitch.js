import {Twitch} from '../../modules/twitch'

export const client = new Twitch({
    client_id: 'gjlalaph9bg1ng78448toih2pd7r6w',
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