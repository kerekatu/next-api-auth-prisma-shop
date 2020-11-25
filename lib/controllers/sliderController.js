import prisma from '@/lib/prisma'
import { promises as fs } from 'fs'
import { CONSTANTS } from '@/lib/constants'

export const getSlider = async (query) => {
  const slider = await prisma.slider.findOne({
    where: { id: +query.id },
    include: { sliderItems: true },
  })

  return { success: true, data: slider }
}

export const getSliders = async () => {
  const sliders = await prisma.slider.findMany()

  return { success: true, data: sliders }
}

export const createSlider = async (body, file) => {
  const createItems = body
    ? {
        create: {
          title: body.title,
          description: body.description,
          image: file.filename,
        },
      }
    : {}

  const slider = await prisma.slider.create({
    data: {
      sliderItems: createItems,
    },
  })

  return { success: true, data: slider }
}

export const updateSliderItem = async (body, file, query) => {
  const slider = await prisma.slider.update({
    where: { id: +query.id },
    data: {
      sliderItems: {
        update: {
          where: { id: +body.sliderItemId },
          data: {
            title: body.title,
            description: body.description,
            image: file.filename,
          },
        },
      },
    },
  })

  return { success: true, data: slider }
}

export const createSliderItem = async (body, file, query) => {
  const createdSliderItem = await prisma.sliderItem.create({
    data: {
      title: body.title,
      description: body.description,
      image: file.filename,
      slider: {
        connect: {
          id: +query.id,
        },
      },
    },
  })

  return { success: true, data: createdSliderItem }
}

export const deleteSlider = async (query) => {
  const deletedSlider = await prisma.slider.delete({
    where: { id: +query.id },
  })

  return { success: true, data: deletedSlider }
}

export const deleteSliderItem = async (body) => {
  const sliderItem = await prisma.sliderItem.findOne({
    where: { id: +body.sliderItemId },
  })

  if (sliderItem?.image) {
    fs.unlink(`${CONSTANTS.sliderImagesPath}/${sliderItem.image}`, (error) => {
      if (error) {
        return { success: false, error }
      }
    })
  }

  const deletedSliderItem = await prisma.sliderItem.delete({
    where: { id: +body.sliderItemId },
  })

  return { success: true, data: deletedSliderItem }
}
