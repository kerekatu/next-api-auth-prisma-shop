import nc from 'next-connect'
import cors from 'cors'
import withSession from '@/lib/withSession'
import { createUserWithSession } from '@/lib/controllers/authController'

const handler = nc().use(cors())

handler.post(async (req, res) => {
  const { body, session } = req
  try {
    const user = await createUserWithSession(body, session)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

export default withSession(handler)
