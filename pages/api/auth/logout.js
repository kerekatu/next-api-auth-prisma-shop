import withSession from '@/lib/withSession'

export default withSession(async (req, res) => {
  try {
    req.session.destroy()
    res.status(200).send({ success: true, isLoggedIn: false })
  } catch (error) {
    res
      .status(400)
      .send({ success: false, error, message: 'could not log you out' })
  }
})
