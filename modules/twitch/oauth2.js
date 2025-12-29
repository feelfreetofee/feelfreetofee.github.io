const endpoint = 'https://id.twitch.tv/oauth2'

// https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#implicit-grant-flow
export function authorize(redirect_uri, client_id, scopes) {
    const authorize = new URLSearchParams({
        response_type: 'token',
        redirect_uri,
        client_id,
        scope: scopes.join(' ')
    })
    return `${endpoint}/authorize?${authorize}`
}

// https://dev.twitch.tv/docs/authentication/validate-tokens/
export async function validate(token) {
    return fetch(`${endpoint}/validate`, {
        headers: {
            authorization: token
        }
    }).then(response => response.json())
}

// https://dev.twitch.tv/docs/authentication/scopes/
export function compareScopes(clientScopes, validationScopes) {
    if (clientScopes.length !== validationScopes.length)
        return false
    clientScopes = [...clientScopes].sort()
    validationScopes = [...validationScopes].sort()
    for (let index = 0; index < clientScopes.length; index++)
        if (clientScopes[index] !== validationScopes[index])
            return false
    return true
}

export function error() {
    const search = new URLSearchParams(location.search)
    const error = search.get('error')
    const error_description = search.get('error_description')
    if (error)
        return `${error} - ${error_description}`
}

export function response() {
    const hash = new URLSearchParams(location.hash.slice(1))
    const token_type = hash.get('token_type')
    if (token_type)
        return {
            token: `${token_type.at().toUpperCase() + token_type.slice(1)} ${hash.get('access_token')}`,
            scopes: hash.get('scope').split(' ')
        }
}