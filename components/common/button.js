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
    border-radius: var(--border-radius);
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
    border-radius: var(--border-radius);
    background-color: var(--color-red);
    padding: 1rem 2rem;
    font-weight: 700;
    color: #fff;
  }

  &.tertiary {
    border: 0.1rem solid var(--color-white);
    border-radius: var(--border-radius);
    background-color: transparent;
    padding: 1rem 2rem;
    color: var(--color-white);
    transition: opacity 0.2s ease-in-out;

    &.active {
      color: black;
      background-color: var(--color-white);

      &:hover {
        opacity: 1;
      }
    }

    &:hover {
      opacity: 0.6;
    }
  }

  &.transparent {
    border: none;
    background-color: transparent;
  }
`

export default Button
