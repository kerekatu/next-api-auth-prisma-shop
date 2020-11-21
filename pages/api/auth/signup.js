import { PrismaClient } from '@prisma/client'
import nc from 'next-connect'
import cors from 'cors'
import withSession from '../../../lib/withSession'
import { userSchema } from '../../../lib/yupSchema'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
const handler = nc().use(cors())

handler.post(async (req, res) => {
  const { body, session } = req
  const isValid = userSchema.isValid({
    username: body.username,
    password: body.password
  })

  try {
    if (isValid) {
      const existingUser = await prisma.user.findOne({
        where: { username: body.username }
      })
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: 'username already exists' })
      }

      const passwordHash = await bcrypt.hash(body.password, 8)
      await prisma.user.create({
        data: {
          username: body.username,
          password: passwordHash
        }
      })
      session.set('user', { isLoggedIn: true, username: body.username, role: 'USER' })
      await session.save()
      res.status(200).json({
        success: true,
        isLoggedIn: true,
        message: 'you have successfully signed up'
      })
    } else {
      userSchema
        .validate({ username: body.username, password: body.password })
        .catch((error) => res.status(400).send({ success: false, error }))
    }
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

export default withSession(handler)
