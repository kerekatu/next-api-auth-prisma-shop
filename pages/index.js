import Link from 'next/link'
import { useRouter } from 'next/router'
import { handleLogout } from '@/lib/api'
import { withAuthServerSideProps } from '@/lib/withSession'

const HomePage = ({ user }) => {
  const router = useRouter()

  return (
    <div>
      {user?.isLoggedIn ? (
        <button
          onClick={() =>
            handleLogout((res) => res.success && router.replace('/'))
          }
        >
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
