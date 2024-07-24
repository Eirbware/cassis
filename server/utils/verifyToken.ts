import { isUser } from '~/utils/User'

export const verifyToken = async (
  token: string
): Promise<User | { statusCode: number; body: string }> => {
  const config = useRuntimeConfig()

  const user = await fetch(`${config.public.EIRB_AUTH_URL_LOCAL}/get_user_info?token=${token}`)
    .then((res) => res.json())
    .catch((err) => {
      console.error('Error while fetching user info', err)
      return null
    })

  if (!user) {
    return {
      statusCode: 500,
      body: 'Error while fetching user info',
    }
  }

  if (!isUser(user)) {
    return {
      statusCode: 401,
      body: 'Unauthorized'
    }
  }

  return user
}
