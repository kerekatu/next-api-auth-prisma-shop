import multer from 'multer'
import nc from 'next-connect'
import cors from 'cors'
import withSession, { withAuth } from '@/lib/withSession'
import { CONSTANTS } from '@/lib/constants'
import {
  getProducts,
  createProductWithImage,
} from '@/lib/controllers/productsController'

const handler = nc().use(cors())

const uploadImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, CONSTANTS.productImagesPath)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    },
  }),
})

handler.get(async (req, res) => {
  const { query } = req

  try {
    const products = await getProducts(query)
    res.status(200).json(products)
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

handler.use(uploadImage.single('image')).post(async (req, res) => {
  const { body, file } = req

  try {
    const createdProduct = await createProductWithImage(body, file)
    res.status(200).json(createdProduct)
  } catch (error) {
    res.status(400).send({ success: false, error })
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
