import { withAuthServerSideProps } from '@/lib/withSession'
import Layout from '@/components/containers/layout'
import Slider from '@/components/slider'
import { getProducts } from '@/lib/controllers/productsController'
import { getCategories } from '@/lib/controllers/categoriesController'
import { getSlider } from '@/lib/controllers/sliderController'
import styled from '@emotion/styled'
import Heading from '@/components/common/heading'
import { CONSTANTS } from '@/lib/constants'
import Form from '@/components/common/form'
import FormField from '@/components/common/form/form-field'
import useForm from '@/hooks/useForm'
import { contactSchema } from '@/lib/yupSchema'

export const getServerSideProps = withAuthServerSideProps({
  callback: async () => {
    return {
      products: await getProducts(),
      categories: await getCategories(),
      slider: await getSlider({ id: '4' })
    }
  }
})

const HomePage = ({ user, data }) => {
  const { products, categories, slider } = data
  const initialFormValues = { name: '', email: '', phone: '', message: '' }
  const { formErrors, handleChange, handleSubmit, formValues } = useForm(
    () => console.log('dupa'),
    initialFormValues,
    contactSchema
  )

  return (
    <ContentWrapper>
      <Layout pageTitle="Homepage">
        <Slider items={slider.data?.sliderItems} />
        <section id="products">
          <Heading>Products</Heading>
          <ul className="list">
            {products?.data.map((product) => (
              <li key={product.id} className="item">
                <h3>{product.title}</h3>
                <img
                  src={`${CONSTANTS.productImagesPath}/${product.image}`}
                  alt="Product"
                />
              </li>
            ))}
          </ul>
        </section>
        <section id="design-your-own">
          <Heading>Design your own rig!</Heading>
        </section>
        <section id="about" className="full-bleed">
          <Heading>About</Heading>
          <div className="container">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis,
              quae. Facere sunt eveniet minus deserunt, atque reiciendis debitis
              maiores dolorem, architecto nobis consectetur eos vero quidem aut
              odio, quaerat earum. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Facilis, quae. Facere sunt eveniet minus
              deserunt, atque reiciendis debitis maiores dolorem, architecto
              nobis consectetur eos vero quidem aut odio, quaerat earum. Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Facilis, quae.
              Facere sunt eveniet minus deserunt, atque reiciendis debitis
              maiores dolorem, architecto nobis consectetur eos vero quidem aut
              odio, quaerat earum.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              natus at incidunt explicabo nobis veniam facilis. Delectus id
              eaque dolorem adipisci nobis, a et vero officia, pariatur ad est
              hic!
            </p>
          </div>
        </section>
        <section id="contact">
          <Heading>Contact us</Heading>
          <Form
            submitText="Send"
            error={formErrors?.errors?.responseError}
            onSubmit={handleSubmit}
          >
            <FormField
              label="Name"
              name="name"
              value={formValues.name}
              error={formErrors?.errors?.name}
              onChange={handleChange}
            />
            <FormField
              label="Email Address"
              name="email"
              value={formValues.email}
              error={formErrors?.errors?.email}
              onChange={handleChange}
            />
            <FormField
              label="Phone Number"
              type="tel"
              name="phone"
              value={formValues.phone}
              error={formErrors?.errors?.phone}
              onChange={handleChange}
            />
            <FormField
              label="Message"
              name="message"
              type="textarea"
              value={formValues.message}
              error={formErrors?.errors?.message}
              onChange={handleChange}
            />
          </Form>
        </section>
      </Layout>
    </ContentWrapper>
  )
}

const ContentWrapper = styled.div`
  section {
    padding: 8rem 0;
  }

  #products {
    .list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem;
      list-style: none;
    }

    .item {
      background-color: var(--color-gray);
      border-radius: var(--border-radius);
      padding: 2rem;
      text-align: center;
    }

    img {
      margin-top: 1.5rem;
      border-radius: var(--border-radius);
      width: 100%;
    }
  }

  #about {
    background-color: var(--color-gray);

    .container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0 8rem;
    }

    p {
      font-size: 1.8rem;
      color: rgba(var(--color-white-rgb), 0.6);
    }
  }

  #contact {
    width: 60rem;
    margin: 0 auto;
  }
`

export default HomePage
