// 解码jwt
export function ParseToken(token) {
    let payload = token.split(".")[1]

    let userInfo = decodeURIComponent(escape(window.atob(payload.replace(/-/g, "+").replace(/_/g, "/"))))
    return JSON.parse(userInfo)
}