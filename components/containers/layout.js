import Header from '@/components/containers/header'
import styled from '@emotion/styled'
import Footer from '@/components/containers/footer'
import Head from 'next/head'
import { CONSTANTS } from '@/lib/constants'

const Layout = ({ pageTitle = '', children }) => {
  return (
    <LayoutWrapper>
      <Head>
        <title>
          {pageTitle} - {CONSTANTS.companyName}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
    grid-template-columns: 1fr min(var(--page-width), 100%) 1fr;
    min-height: calc(100vh - 10rem);
    margin-bottom: 8rem;
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
