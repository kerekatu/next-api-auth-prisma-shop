import multer from 'multer'
import { PrismaClient } from '@prisma/client'
import nc from 'next-connect'
import cors from 'cors'
import fs from 'fs'
import { CONSTANTS } from '@/lib/constants'

const prisma = new PrismaClient()
const handler = nc().use(cors())

const uploadImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/static/product-images')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    },
  }),
})

handler.get(async (req, res) => {
  try {
    const product = await prisma.product.findOne({
      where: { id: +req.query.id },
    })

    res.status(200).json(product)
  } catch (error) {
    res.status(400).send(error)
  }
})

handler.use(uploadImage.single('image')).put(async (req, res) => {
  const { body, file, query } = req

  try {
    const product = await prisma.product.update({
      where: { id: +query.id },
      data: {
        title: body.title,
        description: body.description,
        image: file.filename,
        category: {
          connect: {
            title: body.category,
          },
        },
      },
    })

    res.status(200).json(product)
  } catch (error) {
    res.status(400).send(error)
  }
})

handler.delete(async (req, res) => {
  const { query } = req

  try {
    const product = await prisma.product.findOne({ where: { id: +query.id } })

    if (product?.image) {
      fs.unlinkSync(
        `${CONSTANTS.productImagesPath}/${product.image}`,
        (error) => {
          if (error) {
            return res.status(400).send({ success: false, error })
          }
        }
      )
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: +query.id },
    })
    res.status(200).json({ success: true, deletedProduct })
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
