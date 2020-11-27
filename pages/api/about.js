import nc from 'next-connect'
import cors from 'cors'
import withSession, { withAuth } from '@/lib/withSession'
import { getAbout, updateAbout } from '@/lib/controllers/aboutController'

const handler = nc().use(cors())

handler.get(async (req, res) => {
  try {
    const about = await getAbout()
    res.status(200).json(about)
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

handler.put(async (req, res) => {
  const { body } = req

  try {
    const about = await updateAbout(body)
    res.status(200).send(about)
  } catch (error) {
    res.status(400).send({ success: false, error })
  }
})

export default withSession(
  withAuth(handler, { isProtected: true, roles: ['ADMIN'] })
)
