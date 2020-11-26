import { CONSTANTS } from '@/lib/constants'
import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Heading from './common/heading'

const Slider = ({ items, interval }) => {
  const [currentItem, setCurrentItem] = useState(0)

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      if (currentItem === items.length - 1) {
        return setCurrentItem(0)
      }

      setCurrentItem(currentItem + 1)
    }, interval || 8000)

    return () => {
      clearInterval(sliderInterval)
    }
  }, [currentItem, items.length, interval])

  return (
    <SliderWrapper className="full-bleed">
      <ul>
        {items &&
          items.map(
            (item, index) =>
              currentItem === index && (
                <li key={item.id}>
                  <div className="slider-content">
                    <Heading>{item.title}</Heading>
                    <p>{item.description}</p>
                  </div>
                  <img src={`${CONSTANTS.sliderImagesPath}/${item.image}`} />
                </li>
              )
          )}
      </ul>
    </SliderWrapper>
  )
}

const SliderWrapper = styled.div`
  height: calc(100vh - 10rem);

  li {
    display: block;
    position: relative;
  }

  img {
    object-fit: cover;
    object-position: top;
    height: calc(100vh - 10rem);
    width: 100%;
    user-select: none;
    pointer-events: none;
  }

  .slider-content {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    background-color: rgba(var(--color-black-rgb), 0.8);
    min-width: 60rem;
    padding: 4rem;
    text-align: center;
  }

  .slider-content > p {
    font-size: 2rem;
    color: rgba(var(--color-white-rgb), 0.8);
  }
`

export default Slider
