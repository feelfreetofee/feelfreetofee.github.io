export default class {
	/** @type {string} */
	endpoint
	/** @type {HeadersInit} */
	headers
	/** @type {[Request, (response: Response), (reason: Error)][]} */
	#queue = []
	#running = false
	/**
	 * @param {string} endpoint
	 * @param {HeadersInit?} headers
	 */
	constructor(endpoint, headers) {
		this.endpoint = endpoint
        this.headers =
			headers instanceof Headers
			? headers
			: new Headers(headers)
	}
	/**
	 * @param {string} resource
	 * @param {RequestInit?} options
	 * @returns {Promise<Response>}
	 */
	fetch(resource, options) {
		const {promise, resolve, reject} = Promise.withResolvers()
		this.#queue.push([new Request(
			`${this.endpoint}/${resource}`,
			this.buildRequest(options)
		), resolve, reject])
		if (!this.#running) this.#run(this.#running = true)
		return promise
	}
	/**
	 * @param {RequestInit?} requestInit 
	 */
	buildRequest(requestInit) {
		if (!requestInit)
			requestInit = {}
		requestInit.headers =
			requestInit.headers
			? this.mergeHeaders(this.headers, requestInit.headers)
			: this.headers
		return requestInit
	}
	/**
	 * @param  {...HeadersInit} headers 
	 */
	mergeHeaders(...headers) {
		const result = new Headers
		for (const values of headers)
		if (typeof values === 'object')
		for (const entries of (
			values instanceof Headers
			|| Array.isArray(values)
			? values
			: Object.entries(values)
		))
		if (
			Array.isArray(entries)
			&& entries[0]
			&& typeof entries[0] === 'string'
			&& typeof entries[1] === 'string'
		) 
		result.set(entries[0], entries[1])
		return result
	}
	#run() {
		if (this.#queue.length === 0) return this.#running = false
		const [[request, resolve, reject]] = this.#queue
		fetch(request)
		.then(async response => {
			if (response.status !== 429) { // Too Many Requests
				this.#queue.shift()
				resolve(response)
			}
			const remaining = 
				response.headers.get('x-ratelimit-remaining')
				?? response.headers.get('ratelimit-remaining')
			
			if (remaining === '0')
				setTimeout(() => this.#run(), (
					response.headers.get('x-ratelimit-reset')
					?? response.headers.get('ratelimit-reset')
				) * 1e3 - Date.now())
			else
				this.#run()
		})
		.catch(error => {
			this.#queue.shift()
			reject(error)
			this.#run()
		})
	}
}