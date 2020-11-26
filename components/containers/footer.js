import styled from '@emotion/styled'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="footer-top">
        <div className="container">
          <div className="location">
            <h2>Location</h2>
            <p>Duevej 85</p>
            <p>8500 Grenå</p>
          </div>
          <div className="social">
            <h2>Around the web</h2>
            <Link href="https://www.facebook.com/">
              <a title="Go to our Facebook page">
                <i>
                  <Icon icon={['fab', 'facebook']} />
                </i>
              </a>
            </Link>
            <Link href="https://www.twitter.com/">
              <a title="Go to our Twitter page">
                <i>
                  <Icon icon={['fab', 'twitter']} />
                </i>
              </a>
            </Link>
            <Link href="https://www.linkedin.com/">
              <a title="Go to our Linkedin page">
                <i>
                  <Icon icon={['fab', 'linkedin']} />
                </i>
              </a>
            </Link>
            <Link href="https://www.dribbble.com/">
              <a title="Go to our Dribbble page">
                <i>
                  <Icon icon={['fab', 'dribbble']} />
                </i>
              </a>
            </Link>
          </div>
          <div className="about">
            <h2>About Boston Gaming</h2>
            <p>
              Boston Gaming is a newly founded company, driven by the passion
              for custom pc builds
            </p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright &copy; Boston Gaming</p>
      </div>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.footer`
  text-align: center;

  .footer-top {
    display: flex;
    align-items: center;
    height: 25rem;
    background-color: var(--color-gray);
  }

  .footer-top > .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .footer-top h2 {
    text-transform: uppercase;
    margin-bottom: 2rem;
  }

  .footer-top p {
    color: rgba(var(--color-white-rgb), 0.6);
  }

  .social i {
    display: inline-block;
    line-height: 0;
    border: 0.2rem solid var(--color-white);
    border-radius: 100rem;
    padding: 1rem;
  }

  .social svg {
    display: block;
    width: 2rem;
    height: 2rem;
  }

  .social a + a {
    margin-left: 1rem;
  }

  .social a {
    transition: opacity 0.2s ease-in-out;
  }

  .social a:hover {
    opacity: 0.6;
  }

  .footer-bottom {
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer-bottom > p {
    font-size: 1.6rem;
  }
`

export default Footer
