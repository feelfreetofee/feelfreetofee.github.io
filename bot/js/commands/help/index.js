export default function(client, {message_id: reply_parent_message_id}) {
    return client.sendChatMessage({
        message: `Commands: ${Object.keys(this).join(', ')}`,
        reply_parent_message_id
    })
}