import { withAuthServerSideProps } from '../lib/withSession'
import Link from 'next/Link'
import { handleLogout } from '../lib/api'
import { useRouter } from 'next/router'

const HomePage = ({ user }) => {
  const router = useRouter()
  console.log(user)

  return (
    <div>
      {user?.isLoggedIn ? (
        <button onClick={() => handleLogout(() => router.replace('/'))}>
          <a>Logout</a>
        </button>
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
