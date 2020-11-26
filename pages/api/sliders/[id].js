import multer from 'multer'
import prisma from '@/lib/prisma'
import nc from 'next-connect'
import cors from 'cors'
import { CONSTANTS } from '@/lib/constants'
import withSession, { withAuth } from '@/lib/withSession'
import {
  createSliderItem,
  deleteSlider,
  deleteSliderItem,
  getSlider,
  updateSliderItem
} from '@/lib/controllers/sliderController'

const handler = nc().use(cors())

const uploadImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/${CONSTANTS.sliderImagesPath}`)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
})

handler.get(async (req, res) => {
  const { query } = req

  try {
    const slider = await getSlider(query)
    res.status(200).json(slider)
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

handler
  .use(uploadImage.single('image'))
  .put(async (req, res) => {
    const { body, file, query } = req

    try {
      const updatedSliderItem = await updateSliderItem(body, file, query)
      res.status(200).json(updatedSliderItem)
    } catch (error) {
      res.status(400).send({ success: false, error })
    }
  })
  .post(async (req, res) => {
    const { body, file, query } = req

    try {
      const sliderItem = await createSliderItem(body, file, query)
      res.status(200).json(sliderItem)
    } catch (error) {
      res.status(400).send({ success: false, error })
    }
  })

handler.delete(async (req, res) => {
  const { body, query } = req

  try {
    const deleted = body?.sliderItemId
      ? await deleteSliderItem(body)
      : await deleteSlider(query)
    res.status(200).json({ success: true, deleted })
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
