// iron session wrapper for use in API routes and Next.js' fetching methods
import { withIronSession } from 'next-iron-session'

const OPTIONS_IRON_SESSION = {
  password: process.env.SESSION_SECRET_PASSWORD,
  cookieName: process.env.SESSION_COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}

const checkUserRole = (roles, userRole) => {
  if (userRole === 'ADMIN') return true
  if (roles.includes(userRole)) return true

  return false
}

export const withAuthServerSideProps = (
  options = { isProtected: false, roles: [] }
) => {
  return withIronSession(async ({ req, res }) => {
    const user = req.session.get('user')

    if (options.isProtected && options.roles.length) {
      const isAuth = checkUserRole(options.roles, user?.role)

      if (!isAuth) return { redirect: { permanent: false, destination: '/' } }
    }

    if (!user) return { props: { user: { isLoggedIn: false } } }

    return {
      props: { user }
    }
  }, OPTIONS_IRON_SESSION)
}

export const withAuth = (
  handler,
  options = { isProtected: true, roles: [] }
) => {
  return async function withAuthHandler(...args) {
    const req = args[0]
    const res = args[1]

    const user = req.session.get('user')

    if (options.isProtected) {
      const isAuth = checkUserRole(options.roles || ['USER'], user?.role)

      if (!isAuth) {
        return res
          .status(400)
          .send({ success: false, message: 'you are not authorized' })
      }
    }

    if (!user) return res.redirect('/')

    return handler(...args)
  }
}

export default function withSession(handler) {
  return withIronSession(handler, OPTIONS_IRON_SESSION)
}
