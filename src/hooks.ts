import type { GetSession } from '@sveltejs/kit'
import * as cookie from 'cookie'

export const getSession: GetSession = (event) => {
  const cookies = event.request.headers?.['cookie']
  const parsedCookies = cookies ? cookie.parse(cookies) : false
  if (parsedCookies && parsedCookies?.['userAddress']) {
    return {
      userAddress: parsedCookies?.['userAddress']
    }
  }

  return false
}
