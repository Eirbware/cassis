import { formatURL } from '../utils/URL'
import { isBodyWithProps } from '../utils/checks'

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

  const body = (await readBody(event)) as unknown

  try {
    // Vérification des données

    if (!isBodyWithProps(body, ['uid'] as const)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'URL manquante'
      })
    }
    if (typeof body.uid !== 'string')
      throw createError({
        statusCode: 400,
        statusMessage: 'UID invalide'
      })

    // Le Lien existe

    const link = await LinkShema.findOne({ uid: body.uid })

    if (!link)
      throw createError({
        statusCode: 400,
        statusMessage: `Le lien d'UID ${body.uid} n'existe pas`
      })

    // Le lien appartient bien à l'utilisateur

    if (link.createdBy !== user.user)
      throw createError({
        statusCode: 400,
        statusMessage: `Ce lien n'appartient pas à ${user.user}`
      })

    // Sinon, on édite le lien

    if (isBodyWithProps(body, ['url'] as const) && typeof body.url === 'string') link.url = body.url
    if (isBodyWithProps(body, ['expiresAt'] as const)) {
      if (typeof body.expiresAt === 'number') link.expiresAt = new Date(body.expiresAt)
      else if (body.expiresAt === null) link.expiresAt = body.expiresAt
    }

    await link.save()

    return {
      status: 'success',
      uid: link.uid
    }
  } catch (error) {
    return error
  }
})
