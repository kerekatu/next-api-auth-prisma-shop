import multer from 'multer'
import nc from 'next-connect'
import cors from 'cors'
import withSession, { withAuth } from '@/lib/withSession'
import { CONSTANTS } from '@/lib/constants'
import { createSlider, getSliders } from '@/lib/controllers/sliderController'

const handler = nc().use(cors())

const uploadImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, CONSTANTS.sliderImagesPath)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    },
  }),
})

handler.get(async (req, res) => {
  try {
    const sliders = await getSliders()
    res.status(200).json(sliders)
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

handler.use(uploadImage.single('image')).post(async (req, res) => {
  const { body, file } = req

  try {
    const createdSlider = await createSlider(body, file)
    res.status(200).json(createdSlider)
  } catch (error) {
    res.status(400).send({ succes: false, error })
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default withSession(
  withAuth(handler, { isProtected: true, roles: ['ADMIN'] })
)
