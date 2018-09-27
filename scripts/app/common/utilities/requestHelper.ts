export default class RequestHelper {
    private static _getQueryString(params: any) {
        if (!params)
            return ''
        let queries = []
        for (const p in params) {
            queries.push(`${p}=${encodeURIComponent(params[p])}`)
        }
        return '?' + queries.join('&')
    }

    static async get(resource: string, params?: any) {
        const queryString = RequestHelper._getQueryString(params)
        const result = await fetch(`${resource}${queryString}`, {
            method: 'GET'
        })
        return result && result.json()
    }
}
