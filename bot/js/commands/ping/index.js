export default function(client, {message_id: reply_parent_message_id}) {
    return client.sendChatMessage({
        message: 'pong!',
        reply_parent_message_id
    })
}