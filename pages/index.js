import { withAuthServerSideProps } from '../lib/withSession'
import Link from 'next/Link'

const HomePage = ({ user }) => {
  console.log(user)
  return (
    <div>
      {user?.isLoggedIn ? (
        <Link href="/logout">
          <a>Logout</a>
        </Link>
      ) : (
        <Link href="/login">
          <a>Login</a>
        </Link>
      )}
    </div>
  )
}

export const getServerSideProps = withAuthServerSideProps()

export default HomePage
