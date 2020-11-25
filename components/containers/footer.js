import styled from '@emotion/styled'

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="footer-top"></div>
      <div className="footer-bottom"></div>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.footer`
  .footer-top {
    height: 25rem;
    background-color: var(--color-gray);
  }

  .footer-bottom {
    height: 6rem;
  }
`

export default Footer
