export const getTokenFromCookies = () =>
    {
        const cookies = document.cookie.split('; ')
        const tokenCookie = cookies.find(cookie => cookie.startsWith('access_token='))
        return tokenCookie ? tokenCookie.split('=')[1] : null
    } 