/**
 * @param {Node} parent
 * @param {String} localName
 * @returns {HTMLElement}
 */
export function create(parent, localName, options) {
    const is = options?.is
    if (is) delete options.is
    return parent.appendChild(Object.assign(
        document.createElement(localName, {is}), options
    ))
}