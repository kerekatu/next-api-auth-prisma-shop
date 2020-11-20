import { withAuthServerSideProps } from '../lib/withSession'
import Link from 'next/Link'

const HomePage = ({ user }) => {
  console.log(user)
  return (
    <div>
      {user?.isLoggedIn ? (
        <button
          onClick={async () => {
            const response = await fetch('/api/auth/logout')

            console.log(response)
            if (response.ok) {
              alert('you are logged out')
            }
          }}
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
