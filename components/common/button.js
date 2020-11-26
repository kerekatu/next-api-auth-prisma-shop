import styled from '@emotion/styled'

const Button = ({ className, type = 'button', children, ...props }) => {
  return (
    <ButtonWrapper type={type} className={`button ${className}`} {...props}>
      {children}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.button`
  &.primary {
    border: 0.2rem solid var(--color-white);
    border-radius: 0.4rem;
    background-color: var(--color-gray);
    padding: 1.6rem 3rem;
    font-weight: 700;
    color: #fff;
    transition: opacity 0.2s ease-in-out;

    &:hover {
      opacity: 0.6;
    }
  }

  &.secondary {
    border: none;
    border-radius: 0.4rem;
    background-color: #ff482b;
    padding: 1rem 2rem;
    font-weight: 700;
    color: #fff;
  }
`

export default Button
