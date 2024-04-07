export const verifyToken = async (token: string) => {
  const config = useRuntimeConfig()
  const user = await fetch(`${config.public.EIRB_AUTH_URL}/get_user_info?token=${token}`).then(
    (res) => res.json()
  ).catch((err) => {
    console.error('Error while fetching user info')
    console.error(err)
    return null;
  })

  if (!user) {
    return {
      statusCode: 500,
      body: 'Error while fetching user info',
    }
  }


  if (!user.user) {
    return {
      statusCode: 401,
      body: 'Unauthorized'
    }
  }

  return user
}
