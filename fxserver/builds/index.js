const endpoint = 'https://api.akachan.eu.org/fxserver'

/** @typedef {{version: number, date: number, hash: string}} fxserver_build */

/**
 * @param {string} platform
 * @param {{before?: number, after?: number, list?: number}?} 
 * @returns {Promise<fxserver_build[]>}
 */
async function fetchBuilds(platform, {before, after, limit = 50} = {}) {
    const url = new URL(`${endpoint}/builds/${platform}`)

    if (before)
        url.searchParams.append('before', before)
    else if (after)
        url.searchParams.append('after', after)

    if (limit)
        url.searchParams.append('limit', limit)

    return fetch(url).then(response => response.json())
}

const buildElementTemplate = document.head.querySelector('template#build')

/**
 * @param {fxserver_build} 
 */
function createBuildElement({version, date}) {
    const element = buildElementTemplate.content.cloneNode(true)
    element.querySelector('a').href = `${endpoint}/build/win32/${version}/download`
    element.querySelector('a > div').id = version
    element.querySelector('a > div > span.version').innerText = version
    element.querySelector('a > div > span.date').innerText = new Date(date * 1e3).toLocaleString()
    return element
}

const platform = document.body.querySelector('select#platform')

platform.value = new URLSearchParams(location.search).get('platform')

if (!platform.value)
    platform.value = 'win32'

const main = document.body.querySelector('body > main')

const footer = document.body.querySelector('body > footer')

/**
 * @param {IntersectionObserver} observer
 */
async function load(observer) {
    if (platform.disabled) return

    platform.disabled = true

    const after = main.lastElementChild?.firstElementChild.id

    const builds = await fetchBuilds(platform.value, {after})

    if (!builds.length) {
        observer.disconnect()

        platform.disabled = false

        return
    }

    for (const build of builds)
        main.appendChild(createBuildElement(build))

    platform.disabled = false

    if (footer.getBoundingClientRect().top < window.innerHeight)
        load(observer)
}

const observer = new IntersectionObserver(([{isIntersecting}], observer) => {
    if (isIntersecting)
        load(observer)
})

platform.addEventListener('change', () => {
    observer.disconnect()

    main.replaceChildren()

    observer.observe(footer)

    load(observer)
})

observer.observe(footer)