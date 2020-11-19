// iron session wrapper for use in API routes and Next.js' fetching methods

import { withIronSession } from 'next-iron-session'

const OPTIONS_IRON_SESSION = {
  password: process.env.SESSION_SECRET_PASSWORD,
  cookieName: process.env.SESSION_COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}

export const withAuthServerSideProps = () => {
  return withIronSession(async ({ req, res }) => {
    const user = req.session.get('user')

    if (!user) {
      return { props: { user: { isLoggedIn: false } } }
    }

    return {
      props: { user }
    }
  }, OPTIONS_IRON_SESSION)
}

export default function withSession(handler) {
  return withIronSession(handler, OPTIONS_IRON_SESSION)
}
