import multer from 'multer'
import { PrismaClient } from '@prisma/client'
import nc from 'next-connect'
import cors from 'cors'
import fs from 'fs'
import { CONSTANTS } from '@/lib/constants'
import withSession, { withAuth } from '@/lib/withSession'

const prisma = new PrismaClient()
const handler = nc().use(cors())

const uploadImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, CONSTANTS.categoryImagesPath)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
})

handler.get(async (req, res) => {
  try {
    const category = await prisma.category.findOne({
      where: { id: +req.query.id },
      include: { products: true }
    })

    res.status(200).json({ success: true, category })
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

handler.use(uploadImage.single('image')).put(async (req, res) => {
  const { body, file, query } = req

  try {
    const category = await prisma.category.update({
      where: { id: +query.id },
      data: {
        title: body.title,
        image: file.filename
      }
    })

    res.status(200).json({ success: true, category })
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

handler.delete(async (req, res) => {
  const { query } = req

  try {
    const category = await prisma.category.findOne({ where: { id: +query.id } })

    if (category?.image) {
      fs.unlinkSync(
        `${CONSTANTS.categoryImagesPath}/${category.image}`,
        (error) => {
          if (error) {
            return res.status(400).send({ success: false, error })
          }
        }
      )
    }

    const deletedCategory = await prisma.category.delete({
      where: { id: +query.id }
    })
    res.status(200).json({ success: true, deletedCategory })
  } catch (error) {
    res.status(400).send({ success: false, error })
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
