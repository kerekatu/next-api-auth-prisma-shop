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
    border: none;
    border-radius: 0.4rem;
    background-color: #3b97fc;
    padding: 1rem 2rem;
    font-weight: 700;
    color: #fff;
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
