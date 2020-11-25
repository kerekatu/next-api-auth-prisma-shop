import { withAuthServerSideProps } from '@/lib/withSession'

const AdminPage = () => {
  return <div>Dupa</div>
}

export const getServerSideProps = withAuthServerSideProps({
  isProtected: true,
  roles: ['ADMIN']
})

export default AdminPage
