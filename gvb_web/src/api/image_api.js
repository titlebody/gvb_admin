import http from './request'

export function imageUpdateName(data) {
    return http.put('/images', data)
}