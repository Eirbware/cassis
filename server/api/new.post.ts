import { formatURL } from '../utils/URL'
import { isBodyWithProps } from '../utils/checks'

const shorten = (num: number) => {
  const alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_+!*()'
  let result: string = ''

  const size = alphabet.length

  while (num > 0) {
    result = alphabet[num % size] + result
    num = Math.floor(num / size)
  }

  return result
}

export default defineEventHandler(async (event) => {
  const token = getQuery(event).token

  const user = await verifyToken(token as string)

  if (!user.user || !token) {
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

    if (!isBodyWithProps(body, ['url'] as const))
      throw createError({
        statusCode: 400,
        statusMessage: 'Url manquante'
      })
    const url = formatURL(body.url.toLowerCase())

    // Si le lien existe déjà, on le retourne

    const link = await LinkShema.findOne({ url })

    if (link) {
      return {
        uid: link.uid
      }
    }
    // Sinon, on crée un nouveau lien

    const date = new Date()
    const entry = await new LinkShema({
      url: encodeURI(url),
      uid: shorten(date.getTime()),
      createdAt: date,
      createdBy: body.createdBy,
      visited: 0,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : null
    }).save()

    return {
      status: 'success',
      uid: entry.uid
    }
  } catch (error) {
    return error
  }
})
