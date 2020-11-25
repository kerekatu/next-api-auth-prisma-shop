import Link from 'next/link'
import { useRouter } from 'next/router'
import { handleLogout } from '@/lib/api'
import { withAuthServerSideProps } from '@/lib/withSession'
import Layout from '@/components/containers/layout'
import Slider from '@/components/slider'
import { getProducts } from '@/lib/controllers/productsController'
import { getCategories } from '@/lib/controllers/categoriesController'
import { getSlider } from '@/lib/controllers/sliderController'

const HomePage = ({ user, data }) => {
  const router = useRouter()
  const { products, categories, slider } = data

  console.log()

  return (
    <Layout pageTitle="Homepage">
      <Slider items={slider.data.sliderItems} />
      <div id="products"></div>
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
  callback: async () => {
    return {
      products: await getProducts(),
      categories: await getCategories(),
      slider: await getSlider({ id: '2' }),
    }
  },
})

export default HomePage
