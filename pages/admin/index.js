import Button from '@/components/common/button'
import Layout from '@/components/containers/layout'
import {
  handleLogout,
  handleUpdate,
  handlePostMulti,
  handleDelete,
  handleUpdateMulti
} from '@/lib/api'
import { getAbout } from '@/lib/controllers/aboutController'
import { getProducts } from '@/lib/controllers/productsController'
import { getSliders } from '@/lib/controllers/sliderController'
import { withAuthServerSideProps } from '@/lib/withSession'
import styled from '@emotion/styled'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import FormModal from '@/components/form-modal'

export const getServerSideProps = withAuthServerSideProps({
  options: {
    isProtected: true,
    roles: ['ADMIN']
  },
  callback: async () => {
    return {
      products: await getProducts(),
      sliders: await getSliders(),
      about: await getAbout()
    }
  }
})

// TODO: add client-side validation and code abstraction

const AdminPage = ({ user, data }) => {
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState('products')
  const [properties, setProperties] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalStatus, setModalStatus] = useState({ status: null, message: '' })
  const [formAction, setFormAction] = useState({})
  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    const getProperties = data[currentTab]?.data.map((item) => {
      return Object.keys(item)
    })

    setProperties(getProperties[0])
  }, [currentTab, data])

  const handleModalForm = (values) => {
    if (formAction.method === 'add') {
      return handleAdd(values, formAction.action)
    } else if (formAction.method === 'edit') {
      return handleEdit(values, formAction.action, initialValues)
    } else if (formAction.method === 'delete') {
      return handleDeleteOne(formAction.action, values, initialValues)
    }
  }

  const handleAdd = async (values, action) => {
    if (action === 'productsAdd') {
      const { title, description, image } = values
      const data = await handlePostMulti('/api/products/', {
        title,
        description,
        image
      })
      setModalStatus(data)
    }
  }

  const handleEdit = async (values, action, query) => {
    if (action === 'aboutEdit') {
      return handleUpdate(`/api/about`, values)
    } else if (action === 'productsEdit') {
      return handleUpdateMulti(`/api/products/${query}`, values)
    }
  }

  const handleDeleteOne = async (values, action, query) => {
    if (action === 'productsDelete') {
      return handleDelete(`/api/products/${query}`, values)
    }
  }

  return (
    <Layout pageTitle="Admin Panel">
      <AdminWrapper>
        <h3>Logged in as: {user.username}</h3>
        <Button
          className="secondary"
          onClick={() => handleLogout(() => router.replace('/'))}
        >
          Logout
        </Button>
        <div className="panel">
          <h2>Collections:</h2>
          {Object.keys(data).map((tab, index) => (
            <Button
              className={currentTab === tab ? 'tertiary active' : 'tertiary'}
              onClick={() => setCurrentTab(tab)}
              key={index}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>
        <ul className="panel-content">
          <div className="properties">
            {properties.map((property, index) => (
              <span key={index}>{property}</span>
            ))}
          </div>
          {data[currentTab]?.data.map((item) => (
            <li key={item.id}>
              <div className="actions">
                <Button
                  className="transparent"
                  onClick={() => {
                    setShowModal(true)
                    setFormAction({ action: `${currentTab}Add`, method: 'add' })
                    setInitialValues(item)
                  }}
                >
                  <i className="actions-add">
                    <Icon icon="plus" />
                  </i>
                </Button>
                <Button
                  className="transparent"
                  onClick={() => {
                    setShowModal(true)
                    setFormAction({
                      action: `${currentTab}Edit`,
                      method: 'edit'
                    })
                    setInitialValues(item.id)
                  }}
                >
                  <i className="actions-edit">
                    <Icon icon="edit" />
                  </i>
                </Button>
                <Button
                  className="transparent"
                  onClick={() => {
                    setModalStatus(true)
                    setFormAction({
                      action: `${currentTab}Delete`,
                      method: 'delete'
                    })
                    setInitialValues(item.id)
                  }}
                >
                  <i className="actions-delete">
                    <Icon icon="trash" />
                  </i>
                </Button>
              </div>

              {Object.keys(item).map((property, index) => (
                <div key={index} className="field">
                  {typeof item[property] !== 'object'
                    ? item[property]
                    : Array.isArray(item[property])
                    ? item[property].map((item) => JSON.stringify(item))
                    : item[property]?.title}
                </div>
              ))}
            </li>
          ))}
        </ul>
        <FormModal
          setShowModal={setShowModal}
          modalStatus={modalStatus}
          showModal={showModal}
          handleModalForm={handleModalForm}
          action={formAction.action}
          initialValues={initialValues}
        />
      </AdminWrapper>
    </Layout>
  )
}

const AdminWrapper = styled.section`
  padding: 8rem 0;

  & > h3 {
    margin-bottom: 1rem;
  }

  .panel {
    margin: 4rem 0 2rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .panel-content {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    width: var(--page-width);

    .actions {
      width: 6rem;
      display: flex;
      gap: 1.5rem;

      .actions-edit > svg,
      .actions-add > svg {
        color: var(--color-white);
      }

      .actions-delete > svg {
        color: var(--color-red);
      }
    }

    .properties {
      display: flex;
      background-color: #333;
      border-bottom: 0.1rem solid rgba(var(--color-white-rgb), 0.6);
      padding: 2rem;
      padding-left: 12rem;

      span {
        display: block;
        min-width: 20rem;
        max-width: 20rem;

        &:not(:last-child) {
          margin-right: 4rem;
        }
      }
    }

    li {
      display: flex;
      gap: 4rem;
      align-items: center;
      padding: 0 2rem;
      background-color: #444;
      height: 8rem;

      &:nth-child(even) {
        background-color: #555;
      }
    }

    .field {
      min-width: 20rem;
      max-width: 20rem;
      white-space: nowrap;
      overflow-y: auto;
    }
  }
`

export default AdminPage
