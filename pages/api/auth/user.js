import nc from 'next-connect'
import cors from 'cors'
import withSession from '@/lib/withSession'
import { getUser } from '@/lib/controllers/authController'

const handler = nc().use(cors())

handler.get(async (req, res) => {
  const { session } = req

  try {
    const user = await getUser(session)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
})

export default withSession(handler)
