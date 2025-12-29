import {default as Queue} from '../queue'

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
        this.queue = new Queue('https://api.twitch.tv/helix', {
            authorization: this.token,
            'client-id': this.client_id
        }) 
    }
    connect() {
        if (this.websocket?.readyState < 2) return

        this.websocket = new WebSocket('wss://eventsub.wss.twitch.tv/ws')

        this.websocket.addEventListener('message', ({data}) => {
            const message = JSON.parse(data)
            this.dispatchEvent(new TwitchEvent(message.metadata.message_type, message))
        })
    }
    /**
     * @param {string} resource 
     * @param {Object} body
     */
    async fetch(resource, body) {
        return this.queue.fetch(resource, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
    }
    /** @todo document types */
    async subscriptions(data) {
        return this.fetch('eventsub/subscriptions', data)
    }
    /**
     * https://dev.twitch.tv/docs/api/reference/#send-chat-message
     * @param {{message: string, broadcaster_id?: string, reply_parent_message_id?: string}} 
     * @returns {Promise<{data: [{message_id: string, is_sent: boolean, drop_reason?: {code: string, message: string}, code?: string, message?: string}]}>}
     */
    async sendChatMessage({message, broadcaster_id, reply_parent_message_id}) {
        return this.fetch('chat/messages', {
            broadcaster_id: broadcaster_id ?? this.user_id,
            sender_id: this.user_id,
            message,
            reply_parent_message_id
        })
    }
}


