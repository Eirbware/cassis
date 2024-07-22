export default defineEventHandler(async (event) => {
  const token = getQuery(event).token

  const tokenVerified = await verifyToken(token as string).then((user) =>
    'user' in user ? true : false
  )

  if (!tokenVerified) {
    throw new Error('Unauthorized')
  }

  const user = getRouterParam(event, 'user')

  const links = await LinkShema.find(
    {
      createdBy: user
    },
    {},
    {
      sort: {
        createdAt: -1
      }
    }
  )

  return {
    statusCode: 200,
    body: links.map((link) => ({
      uid: link.uid,
      url: link.url,
      createdAt: link.createdAt,
      visited: link.visited
    }))
  }
})
