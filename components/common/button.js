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
    color: red;
  }
`

export default Button
