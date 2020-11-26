import { withAuthServerSideProps } from '@/lib/withSession'
import Layout from '@/components/containers/layout'
import Slider from '@/components/slider'
import { getProducts } from '@/lib/controllers/productsController'
import { getSlider } from '@/lib/controllers/sliderController'
import styled from '@emotion/styled'
import Heading from '@/components/common/heading'
import { CONSTANTS, fakeData } from '@/lib/constants'
import Form from '@/components/common/form'
import FormField from '@/components/common/form/form-field'
import useForm from '@/hooks/useForm'
import { contactSchema } from '@/lib/yupSchema'
import { getAbout } from '@/lib/controllers/aboutController'
import { mq } from '@/styles/global'

export const getServerSideProps = withAuthServerSideProps({
  callback: async () => {
    return {
      products: await getProducts(),
      slider: await getSlider({ id: '4' }),
      about: await getAbout(),
    }
  },
})

const HomePage = ({ user, data }) => {
  const { products, slider, about } = data
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
          <div className="build">
            <div className="picker">
              <h2>Pick your gear</h2>
              {Object.keys(fakeData.components).map((category, index) => (
                <ul className="picker-category" key={index}>
                  <p>{category}</p>
                  {fakeData.components[category].map((item, index) => (
                    <li className="picker-item" key={index}>
                      <input type="radio" />
                      <label>{item.model}</label>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <div className="summary">
              <h2>Summary</h2>
              <div className="total">
                <span>Total</span>
                <span className="price">$0</span>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="full-bleed">
          <Heading>About</Heading>
          <div
            className="container"
            dangerouslySetInnerHTML={{ __html: about?.data[0]?.content }}
          ></div>
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

  #products,
  #design-your-own,
  #about,
  #contact {
    ${mq[1]} {
      padding: 8rem 2rem;
    }
  }

  #products {
    .list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem;
      list-style: none;

      ${mq[1]} {
        grid-template-columns: repeat(2, 1fr);
      }

      ${mq[0]} {
        grid-template-columns: 1fr;
      }
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

      ${mq[1]} {
        width: 100%;
        height: auto;
      }
    }
  }

  #design-your-own {
    .build {
      display: grid;
      grid-template-columns: 60% 1fr;
      gap: 2rem;

      ${mq[1]} {
        grid-template-columns: 1fr;
      }

      h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
    }

    .picker {
      .picker-category {
        display: grid;
        grid-template-columns: 1fr 3fr;
        list-style: none;
        background-color: var(--color-gray);
        padding: 1rem 2rem;
        border-radius: var(--border-radius);

        & > p {
          grid-column: 1 / 2;
        }

        & > li {
          grid-column: 2 / -1;
        }
      }

      .picker-category + .picker-category {
        margin-top: 1rem;
      }

      .picker-item {
        display: flex;
        align-items: center;
        gap: 0 1rem;

        & > label {
          text-transform: capitalize;
        }
      }
    }

    .summary {
      .total {
        display: flex;
        justify-content: space-between;
        background-color: var(--color-white);
        border-radius: var(--border-radius);
        color: var(--color-black);
        padding: 1rem 2rem;
      }

      .price {
        background-color: var(--color-black);
        color: var(--color-white);
        border-radius: 100rem;
        padding: 0 1rem;
      }
    }
  }

  #about {
    background-color: var(--color-gray);

    .container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0 8rem;

      ${mq[1]} {
        grid-template-columns: 1fr;
      }
    }

    p {
      font-size: 1.8rem;
      color: rgba(var(--color-white-rgb), 0.6);
    }

    p + p {
      ${mq[1]} {
        margin-top: 2rem;
      }
    }
  }

  #contact {
    width: 60rem;
    margin: 0 auto;

    ${mq[1]} {
      width: 100%;
    }
  }
`

export default HomePage
