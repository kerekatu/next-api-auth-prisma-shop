import prisma from '@/lib/prisma'
import { promises as fs } from 'fs'
import { CONSTANTS } from '@/lib/constants'

export const getProducts = async (query) => {
  if (query?.search) {
    const searchProducts = await prisma.product.findMany({
      where: { title: { contains: query.search, mode: 'insensitive' } }
    })

    return { success: true, data: searchProducts }
  }

  const products = await prisma.product.findMany({
    include: { category: true }
  })

  return { success: true, data: products }
}

export const getProduct = async (query) => {
  const product = await prisma.product.findOne({
    where: { id: +query.id }
  })

  if (!product) return { success: false, message: 'product does not exist' }

  return { success: true, data: product }
}

export const createProductWithImage = async (body, file) => {
  const connectCategory = body?.category
    ? { connect: { title: body?.category || '' } }
    : {}

  const product = await prisma.product.create({
    data: {
      title: body.title,
      description: body.description,
      image: file.filename,
      category: connectCategory
    }
  })

  return { success: true, data: product }
}

export const updateProduct = async (query, body, file) => {
  const connectCategory = body?.category
    ? { connect: { title: body?.category || '' } }
    : {}

  const product = await prisma.product.update({
    where: { id: +query.id },
    data: {
      title: body.title,
      description: body.description,
      image: file.filename,
      category: connectCategory
    }
  })

  return { sucess: true, data: product }
}

export const deleteProduct = async (query) => {
  const product = await prisma.product.findOne({ where: { id: +query.id } })

  if (product?.image) {
    fs.unlink(
      `public/${CONSTANTS.productImagesPath}/${product.image}`,
      (error) => {
        if (error) {
          return { success: false, error }
        }
      }
    )
  }

  const deletedProduct = await prisma.product.delete({
    where: { id: +query.id }
  })

  return { success: true, data: deletedProduct }
}
