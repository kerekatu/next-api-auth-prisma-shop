import { CONSTANTS } from '@/lib/constants'
import styled from '@emotion/styled'

const Navbar = () => {
  return (
    <NavbarWrapper>
      <ul>
        {CONSTANTS.navbarItems.map((item, index) => (
          <a href={`#${item.slug}`} key={index} title={item.text}>
            <li>{item.text}</li>
          </a>
        ))}
      </ul>
    </NavbarWrapper>
  )
}

const NavbarWrapper = styled.nav`
  ul {
    display: flex;
    list-style: none;
    gap: 0 3rem;
    text-transform: uppercase;
    font-weight: 700;
  }
`

export default Navbar
