import Button from '@/components/common/button'
import Layout from '@/components/containers/layout'
import { getProducts } from '@/lib/controllers/productsController'
import { withAuthServerSideProps } from '@/lib/withSession'
import styled from '@emotion/styled'
import { useState } from 'react'

export const getServerSideProps = withAuthServerSideProps({
  options: {
    isProtected: true,
    roles: ['ADMIN']
  },
  callback: async () => {
    return {
      products: await getProducts()
    }
  }
})

const AdminPage = ({ user, data }) => {
  const [currentTab, setCurrentTab] = useState('products')

  console.log(data[currentTab])

  return (
    <Layout pageTitle="Admin Panel">
      <AdminWrapper>
        <h3>Logged in as: {user.username}</h3>
        <div className="panel">
          <Button onClick={() => setCurrentTab('products')}>Products</Button>
          <Button onClick={() => setCurrentTab('categories')}>
            Categories
          </Button>
          <Button onClick={() => setCurrentTab('sliders')}>Sliders</Button>
        </div>
        <div className="panel-content">
          {data[currentTab]?.data.map((item) => (
            <li key={item.id}>{item?.title}</li>
          ))}
        </div>
      </AdminWrapper>
    </Layout>
  )
}

const AdminWrapper = styled.section`
  padding: 8rem 0;

  .panel {
  }
`

export default AdminPage
