import {Twitch} from './twitch'

export const client = new Twitch({
    client_id: '73vgkrms3plerfqgtxpzketgh2abgr',
    token: localStorage.getItem('irl_twitch_token'),
    scopes: ['user:read:chat', 'chat:edit']
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

