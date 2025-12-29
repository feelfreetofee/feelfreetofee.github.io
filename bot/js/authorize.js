import {client} from './twitch'

import * as OAuth2 from '../../modules/twitch/oauth2'

function alternativeFlow(element) {
    const tokenDialog = element.querySelector('dialog.token')
    element.querySelector('a.twitch').addEventListener('click', event => {
        tokenDialog.showModal()
        window.invokeNative('openUrl',
            OAuth2.authorize(
                `${location.origin}${location.pathname}`, /** @todo external website */
                client.client_id,
                client.scopes
            )
        )
    })
    const errorElement = tokenDialog.querySelector('form div.error')
    tokenDialog.querySelector('form').addEventListener('submit', event => {
        event.preventDefault()
        const {target: [input, submit]} = event
        const {value: token} = input
        if (
            !token
            || token === 'Bearer '
            || !token.startsWith('Bearer ')
        ) return errorElement.innerText = 'Invalid authorization token'
        submit.disabled = true
        submit.value = 'Validating...'
        OAuth2.validate(token).then(response => {
            submit.value = 'Connect'
            input.addEventListener('input', () => submit.disabled = false, {once: true})
            if (response.status)
                return errorElement.innerText = `${response.status} - ${response.message}`
            localStorage.setItem('tts_twitch_token', token)
            location.reload()
        })
    })
}

function authorizationFlow(error) {
    const element = document.importNode(
        document.head.querySelector('template#authorize').content,
        true
    )

    if (error)
        element.querySelector('div.error').innerText = error

    if (window.invokeNative)
        alternativeFlow(client, element)
    else
        element.querySelector('a.twitch').href =
            OAuth2.authorize(
                `${location.origin}${location.pathname}`,
                client.client_id,
                client.scopes
            )

    document.body.replaceChildren(element)
}

export default function() {
    const response = OAuth2.response()

    if (response && !client.token)
        localStorage.setItem('tts_twitch_token', client.token = response.token)

    if (client.token)
        OAuth2.validate(client.token).then(response => {
            const error = response.status
            ?  `${response.status} - ${response.message}`
            : !OAuth2.compareScopes(client.scopes, response.scopes)
            ? 'Scopes changed, please reauthorize.'
            : client.connect(client.user_id = response.user_id)
            if (!error) return
            localStorage.removeItem('tts_twitch_token')
            authorizationFlow(error)
        })
    else
        authorizationFlow(OAuth2.error())
}