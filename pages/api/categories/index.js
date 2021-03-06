import multer from 'multer'
import { PrismaClient } from '@prisma/client'
import nc from 'next-connect'
import cors from 'cors'
import withSession, { withAuth } from '@/lib/withSession'

const prisma = new PrismaClient()
const handler = nc().use(cors())

const uploadImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/static/category-images')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
})

handler.get(async (req, res) => {
  try {
    const categories = await prisma.category.findMany()

    res.status(200).json(categories)
  } catch (error) {
    res.status(400).send(error)
  }
})

handler.use(uploadImage.single('image')).post(async (req, res) => {
  const { body, file } = req

  try {
    const category = await prisma.category.create({
      data: {
        title: body.title,
        image: file.filename
      }
    })

    res.status(200).json(category)
  } catch (error) {
    res.status(400).send(error)
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default withSession(
  withAuth(handler, { isProtected: true, roles: ['ADMIN'] })
)
