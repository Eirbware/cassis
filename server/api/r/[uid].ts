import { verifyToken } from '~/server/utils/verifyToken'

export default defineEventHandler(async (event) => {
  const token = getQuery(event).token

  const user = await verifyToken(token as string)

  if (!('user' in user) || !token) {
    return {
      statusCode: 401,
      body: {
        message: 'Unauthorized'
      }
    }
  }

  const uid = getRouterParam(event, 'uid')

  const link = await LinkShema.findOneAndUpdate(
    {
      uid
    },
    { $inc: { visited: 1 } }
  )

  if (!link) {
    return {
      statusCode: 404,
      statusMessage: 'Lien non trouvé'
    }
  }

  if (link.expiresAt && link.expiresAt < new Date()) {
    return {
      statusCode: 410,
      statusMessage: 'Lien expiré'
    }
  }

  return {
    statusCode: 200,
    url: link.url
  }
})
