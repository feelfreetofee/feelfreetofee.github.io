import {create as createElement} from '../js/element'
Element.prototype.createElement = function(localName, options) {
    return createElement(this, localName, options)
}
String.prototype.capitalize = function() {
    return this.at().toUpperCase() + this.slice(1)
}
const search = new URLSearchParams(location.search)
const error = search.get('error')
const error_description = search.get('error_description')
if (error)
    document.body.createElement('div', {
        innerHTML: `${error} - ${error_description}`
    })
else {
    const hash = new URLSearchParams(location.hash.slice(1))
    const token_type = hash.get('token_type')
    const access_token = hash.get('access_token')
    console.log(token_type, access_token)
    if (access_token) {
        const value = `${token_type.capitalize()} ${access_token}`
        document.body.createElement('input', {
            type: 'password',
            disabled: true,
            value
        })
        document.body.createElement('button', {
            innerText: 'COPY',
            onclick() {
                navigator.clipboard.write([new ClipboardItem({'text/plain': value})])
                .then(() => alert('Token copied to the clipboard successfully'))
                .catch(() => alert('Failed to copy to the clipboard, like wtf'))
            }
        })
    }
}