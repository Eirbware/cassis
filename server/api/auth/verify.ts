export default defineEventHandler(async (event) => {
  const token = getQuery(event).token

  if (!token) {
    return {
      statusCode: 400,
      body: 'Token is required'
    }
  }

  return verifyToken(token as string)
})
