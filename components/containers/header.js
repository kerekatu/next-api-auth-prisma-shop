import styled from '@emotion/styled'
import Logo from '@/components/common/logo'
import Navbar from '@/components/navbar'

const Header = () => {
  return (
    <HeaderWrapper>
      <div className="container">
        <Logo />
        <Navbar />
      </div>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  background-color: var(--color-white);
  color: var(--color-black);
  padding: 0 2rem;

  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

export default Header
