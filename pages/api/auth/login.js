import nc from 'next-connect'
import cors from 'cors'
import withSession from '@/lib/withSession'
import { getUserWithSession } from '@/lib/controllers/authController'

const handler = nc().use(cors())

handler.post(async (req, res) => {
  const { body, session } = req

  try {
    const user = await getUserWithSession(body, session)
    res.status(200).json(user)
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error, message: 'wrong username or password' })
  }
})

export default withSession(handler)
