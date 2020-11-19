import { PrismaClient } from '@prisma/client'
import nc from 'next-connect'
import cors from 'cors'
import withSession from '../../../lib/withSession'

const prisma = new PrismaClient()
const handler = nc().use(cors())

handler.get(async (req, res) => {
  try {
    const user = req.session.get('user')

    if (user) {
      const userDetails = await prisma.user.findOne({
        where: { username: user.username }
      })
      delete userDetails.password

      res.status(200).json({ isloggedIn: true, ...userDetails })
    } else {
      res.status(404).json({ isloggedIn: false })
    }
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
})

export default withSession(handler)
