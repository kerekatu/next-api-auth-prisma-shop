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
      cb(null, 'public/static/product-images')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
})

handler.get(async (req, res) => {
  const { query } = req

  try {
    if (query?.search) {
      const searchProducts = await prisma.product.findMany({
        where: { title: { contains: query.search, mode: 'insensitive' } }
      })

      return res.status(200).json(searchProducts)
    }

    const products = await prisma.product.findMany({
      include: { category: true }
    })

    res.status(200).json(products)
  } catch (error) {
    res.status(400).send(error)
  }
})

handler.use(uploadImage.single('image')).post(async (req, res) => {
  const { body, file } = req

  try {
    const product = await prisma.product.create({
      data: {
        title: body.title,
        description: body.description,
        image: file.filename,
        category: {
          connect: {
            title: body.category
          }
        }
      }
    })

    res.status(200).json(product)
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
