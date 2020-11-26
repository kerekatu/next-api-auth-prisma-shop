import prisma from '@/lib/prisma'

export const getAbout = async () => {
  const about = await prisma.about.findMany()

  return { success: true, data: about }
}

export const updateAbout = async (body, query) => {
  const updatedAbout = prisma.about.update({
    where: { id: +query.id },
    data: {
      content: body.content,
    },
  })

  return { success: true, data: updatedAbout }
}
