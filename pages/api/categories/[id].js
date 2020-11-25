import multer from 'multer'
import nc from 'next-connect'
import cors from 'cors'
import { CONSTANTS } from '@/lib/constants'
import withSession, { withAuth } from '@/lib/withSession'
import {
  deleteCategory,
  getCategory,
} from '@/lib/controllers/categoriesController'

const handler = nc().use(cors())

const uploadImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, CONSTANTS.categoryImagesPath)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    },
  }),
})

handler.get(async (req, res) => {
  const { query } = req
  try {
    const category = await getCategory(query)

    res.status(200).json(category)
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

handler.use(uploadImage.single('image')).put(async (req, res) => {
  const { body, file, query } = req

  try {
    const updatedCategory = await updatedCategory(body, file, query)

    res.status(200).json(updatedCategory)
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

handler.delete(async (req, res) => {
  const { query } = req

  try {
    const deletedCategory = await deleteCategory(query)
    res.status(200).json(deletedCategory)
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
