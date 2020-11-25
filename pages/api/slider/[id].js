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
      cb(null, CONSTANTS.sliderImagesPath)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
})

handler.get(async (req, res) => {
  try {
    const slider = await prisma.slider.findOne({
      where: { id: +req.query.id },
      include: { sliderItems: true }
    })

    res.status(200).json({ success: true, slider })
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

handler.use(uploadImage.single('image')).put(async (req, res) => {
  const { body, file, query } = req

  try {
    const slider = await prisma.slider.update({
      where: { id: +query.id },
      data: {
        sliderItems: {
          upsert: {
            title: body.title,
            description: body.description,
            image: file.filename
          }
        }
      }
    })

    res.status(200).json({ success: true, slider })
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

handler.delete(async (req, res) => {
  const { query } = req

  try {
    const slider = await prisma.slider.findOne({ where: { id: +query.id } })

    if (slider?.image) {
      fs.unlinkSync(
        `${CONSTANTS.sliderImagesPath}/${slider.image}`,
        (error) => {
          if (error) {
            return res.status(400).send({ success: false, error })
          }
        }
      )
    }

    const deletedSlider = await prisma.slider.delete({
      where: { id: +query.id }
    })
    res.status(200).json({ success: true, deletedSlider })
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
