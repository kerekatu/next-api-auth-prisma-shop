import prisma from '@/lib/prisma'
import { promises as fs } from 'fs'
import { CONSTANTS } from '@/lib/constants'

export const getCategories = async () => {
  const categories = await prisma.category.findMany()

  return { success: true, data: categories }
}

export const getCategory = async (query) => {
  const category = await prisma.category.findOne({
    where: { id: +query.id },
    include: { products: true },
  })

  if (!category) return { success: false, message: 'category does not exist' }

  return { success: true, data: category }
}

export const createCategory = async (body, file) => {
  const category = await prisma.category.create({
    data: {
      title: body.title,
      image: file.filename,
    },
  })

  return { success: true, data: category }
}

export const updateCategory = async (query, body, file) => {
  const category = await prisma.category.update({
    where: { id: +query.id },
    data: {
      title: body.title,
      image: file.filename,
    },
  })

  return { success: true, data: category }
}

export const deleteCategory = async (query) => {
  const category = await prisma.category.findOne({ where: { id: +query.id } })

  if (category?.image) {
    fs.unlink(`${CONSTANTS.categoryImagesPath}/${category.image}`, (error) => {
      if (error) {
        return { success: false, error }
      }
    })
  }

  const deletedCategory = await prisma.category.delete({
    where: { id: +query.id },
  })

  return { success: true, data: deletedCategory }
}
