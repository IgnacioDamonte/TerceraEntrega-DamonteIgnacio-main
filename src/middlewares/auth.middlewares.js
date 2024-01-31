export const authorization = role => {
  return async (req, res, next) => {
    const { user } = req.user
    if (!user) return res.status(401).send({ error: 'Unauthorized' })
    if (user.role != role) return res.status(403).send({ error: 'No permisions' })
    return next()
  }
}