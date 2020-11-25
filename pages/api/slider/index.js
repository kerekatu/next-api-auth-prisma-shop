import multer from 'multer'
import { PrismaClient } from '@prisma/client'
import nc from 'next-connect'
import cors from 'cors'
import withSession, { withAuth } from '@/lib/withSession'
import { CONSTANTS } from '@/lib/constants'

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
    const sliders = await prisma.slider.findMany()

    res.status(200).json(sliders)
  } catch (error) {
    res.status(400).send(error)
  }
})

handler.use(uploadImage.single('image')).post(async (req, res) => {
  const { body, file } = req

  try {
    const slider = await prisma.slider.create({
      data: {
        sliderItems: {
          create: [
            {
              title: body.title,
              description: body.description
            }
          ]
        }
      }
    })

    res.status(200).json(slider)
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
