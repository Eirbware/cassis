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

    if (!isBodyWithProps(body, ['uid'] as const))
      throw createError({
        statusCode: 400,
        statusMessage: 'UID manquant'
      })
    if (typeof body.uid !== 'string')
      throw createError({
        statusCode: 400,
        statusMessage: 'UID invalide'
      })

    // On essaye de supprimer le lien

    const del = await LinkShema.deleteOne({ uid: body.uid })
    if (!del.deletedCount)
      throw createError({
        statusCode: 500,
        statusMessage: `Aucun lien pour l'UID ${body.uid}`
      })

    return {
      status: 'success',
      uid: body.uid
    }
  } catch (error) {
    return error
  }
})
