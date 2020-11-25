import Link from 'next/link'
import { useRouter } from 'next/router'
import { handleLogout } from '@/lib/api'
import { withAuthServerSideProps } from '@/lib/withSession'
import Layout from '@/components/containers/layout'
import Slider from '@/components/slider'
import { getProducts } from './api/products'

const HomePage = ({ user, data }) => {
  const router = useRouter()

  return (
    <Layout>
      <Slider />
    </Layout>
    // <div>
    //   {user?.isLoggedIn ? (
    //     <button
    //       onClick={() =>
    //         handleLogout((res) => res.success && router.replace('/'))
    //       }
    //     >
    //       <a>Logout</a>
    //     </button>
    //   ) : (
    //     <Link href="/login">
    //       <a>Login</a>
    //     </Link>
    //   )}
    // </div>
  )
}

export const getServerSideProps = withAuthServerSideProps({
  callback: getProducts()
})

export default HomePage
