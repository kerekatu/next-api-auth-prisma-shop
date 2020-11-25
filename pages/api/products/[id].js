import multer from 'multer'
import nc from 'next-connect'
import cors from 'cors'
import { CONSTANTS } from '@/lib/constants'
import withSession, { withAuth } from '@/lib/withSession'
import {
  deleteProduct,
  getProduct,
  updateProduct,
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
    const product = await getProduct(query)
    return res.status(200).json(product)
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

handler.use(uploadImage.single('image')).put(async (req, res) => {
  const { body, file, query } = req
  try {
    const updatedProduct = await updateProduct(query, body, file)
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

handler.delete(async (req, res) => {
  const { query } = req
  try {
    const deletedProduct = await deleteProduct(query)
    res.status(200).json(deletedProduct)
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
