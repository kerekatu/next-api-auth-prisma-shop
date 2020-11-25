import Header from '@/components/containers/header'
import styled from '@emotion/styled'
import Footer from '@/components/containers/footer'

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <main>{children}</main>
      <Footer />
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-rows: 10rem 1fr 31rem;
  position: relative;

  main {
    display: grid;
    grid-template-columns: 1fr, min-content(var(--page-width), 100%) 1fr;
  }

  main > * {
    grid-column: 2;
  }

  main > .full-bleed {
    width: 100%;
    grid-column: 1 / 4;
  }
`

export default Layout
