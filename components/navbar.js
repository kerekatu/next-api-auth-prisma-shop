import { CONSTANTS } from '@/lib/constants'
import styled from '@emotion/styled'
import { mq } from '@/styles/global'
import Button from './common/button'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const Navbar = () => {
  const [show, setShow] = useState(false)

  return (
    <NavbarWrapper>
      <ul className="full">
        {CONSTANTS.navbarItems.map((item, index) => (
          <a href={`#${item.slug}`} key={index} title={item.text}>
            <li>{item.text}</li>
          </a>
        ))}
      </ul>
      <ul className="compact">
        <Button className="transparent" onClick={() => setShow(!show)}>
          <i>
            <Icon icon="bars" />
          </i>
        </Button>
        {show && (
          <div className="dropdown">
            {CONSTANTS.navbarItems.map((item, index) => (
              <a href={`#${item.slug}`} key={index} title={item.text}>
                <li>{item.text}</li>
              </a>
            ))}
          </div>
        )}
      </ul>
    </NavbarWrapper>
  )
}

const NavbarWrapper = styled.nav`
  ul.full {
    display: flex;
    list-style: none;
    gap: 0 3rem;
    text-transform: uppercase;
    font-weight: 700;

    ${mq[1]} {
      display: none;
    }
  }

  ul.compact {
    display: none;
    position: relative;

    ${mq[1]} {
      display: block;
    }

    i {
      font-size: 2.4rem;
    }

    .dropdown {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      top: 6rem;
      right: 0;
      white-space: nowrap;
      text-transform: uppercase;
      font-weight: 700;
      z-index: 100;
      background-color: var(--color-white);
      padding: 2rem;
      list-style: none;
    }
  }
`

export default Navbar
