import styled from '@emotion/styled'
import Link from 'next/link'
import { CONSTANTS } from '@/lib/constants'

const Logo = () => {
  return (
    <LogoWrapper>
      <Link href="/">
        <a>
          <img src={CONSTANTS.logoImage} alt="Logotype" />
          <div>{CONSTANTS.companyName}</div>
        </a>
      </Link>
    </LogoWrapper>
  )
}

const LogoWrapper = styled.div`
  a {
    display: flex;
    align-items: center;
    gap: 0 2rem;
  }

  a > img {
    height: 5rem;
  }

  a > div {
    font-size: var(--font-size-3);
    font-weight: 700;
    text-transform: uppercase;
  }
`

export default Logo
