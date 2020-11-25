import { CONSTANTS } from '@/lib/constants'
import styled from '@emotion/styled'

const Slider = ({ items }) => {
  return (
    <SliderWrapper className="full-bleed">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <img
              src={`${CONSTANTS.sliderImagesPath}/${item.image}`}
              className="img"
            />
          </li>
        ))}
      </ul>
    </SliderWrapper>
  )
}

const SliderWrapper = styled.div`
  height: calc(100vh - 10rem);

  li {
    display: block;
  }

  .img {
    object-fit: cover;
    object-position: top;
    height: calc(100vh - 10rem);
    width: 100%;
    user-select: none;
    pointer-events: none;
  }
`

export default Slider
