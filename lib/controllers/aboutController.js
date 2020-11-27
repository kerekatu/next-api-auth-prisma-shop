import prisma from '@/lib/prisma'

export const getAbout = async () => {
  const about = await prisma.about.findMany()

  return { success: true, data: about }
}

export const updateAbout = async (body) => {
  const updatedAbout = await prisma.about.update({
    where: { id: 1 },
    data: {
      content: body.content
    }
  })

  return { success: true, data: updatedAbout }
}
