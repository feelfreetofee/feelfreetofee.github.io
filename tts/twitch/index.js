export class TwitchEvent extends Event {
    constructor(type, data) {
        super(type)
        this.data = data
    }
}

export class Twitch extends EventTarget {
    constructor({client_id, token, scopes}) {
        super()
        this.client_id = client_id
        this.token = token
        this.scopes = scopes
    }
    connect() {
        this.websocket = new WebSocket('wss://eventsub.wss.twitch.tv/ws')

        this.websocket.addEventListener('message', ({data}) => {
            const message = JSON.parse(data)
            this.dispatchEvent(new TwitchEvent(message.metadata.message_type, message))
        })
    }
    async subscriptions(data) {
        return fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.token,
                'Client-Id': this.client_id
            },
            body: JSON.stringify(data)
        })
    }
    async sendMessage(broadcaster_user_id, message) {
        return fetch('https://api.twitch.tv/helix/chat/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.token,
                'Client-Id': this.client_id
            },
            body: JSON.stringify({
                broadcaster_id: broadcaster_user_id,
                sender_id: this.user_id,
                message: message
            })
        })
    }
}


