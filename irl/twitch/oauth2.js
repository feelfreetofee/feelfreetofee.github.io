// https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#implicit-grant-flow

function compareScopes(client, validation) {
    if (client.length !== validation.length) return
    const a = [...client].sort(), b = [...validation].sort()
    for (let index = 0; index < a.length; index++)
        if (a[index] !== b[index])
            return
    return true
}

export function validate(client) {
    return fetch('https://id.twitch.tv/oauth2/validate', {
        headers: {
            authorization: client.token
        }
    }).then(r => 
        r.json().then(validation => {
            if (r.ok && compareScopes(client.scopes, validation.scopes))
                return validation
            throw new Error(validation)
        })
    )
}

export function authorize(redirect_uri, client_id, scopes) {
    const authorize = new URLSearchParams({
        response_type: 'token',
        redirect_uri,
        client_id,
        scope: scopes.join(' ')
    })
    return `https://id.twitch.tv/oauth2/authorize?${authorize.toString()}`
}

class OAuth2Error extends Error {
    constructor(name, message) {
        super(message)
        this.name = name
    }
}

export function response() {
    const search = new URLSearchParams(location.search)
    const error = search.get('error')
    const error_description = search.get('error_description')
    if (error)
        throw new OAuth2Error(error, error_description)
    const hash = new URLSearchParams(location.hash.slice(1))
    const token_type = hash.get('token_type')
    const access_token = hash.get('access_token')
    if (access_token)
        return `${token_type.capitalize()} ${access_token}`
}