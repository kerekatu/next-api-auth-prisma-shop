import styled from '@emotion/styled'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

const Heading = ({ children }) => {
  return (
    <HeadingWrapper>
      <span>{children}</span>
      <div className="line">
        <Icon icon="star" />
      </div>
    </HeadingWrapper>
  )
}

const HeadingWrapper = styled.h1`
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;

  .line {
    display: block;
    position: relative;
    margin-top: 0.4rem;
    font-size: 3.2rem;
  }

  .line::before,
  .line::after {
    content: '';
    position: absolute;
    top: 50%;
    background-color: var(--color-white);
    width: 10rem;
    height: 0.4rem;
    border-radius: var(--border-radius);
  }

  .line::before {
    left: 6rem;
  }

  .line::after {
    right: 6rem;
  }
`

export default Heading
