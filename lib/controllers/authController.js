import prisma from '@/lib/prisma'
import { userSchema } from '@/lib/yupSchema'
import bcrypt from 'bcryptjs'

export const getUserWithSession = async (body, session) => {
  const isValid = userSchema.isValid({
    username: body.username,
    password: body.password,
  })

  if (isValid) {
    const existingUser = await prisma.user.findOne({
      where: { username: body.username },
    })
    if (!existingUser) {
      return { success: false, message: 'username does not exist' }
    }

    const isPasswordMatching = await bcrypt.compare(
      body.password,
      existingUser.password
    )
    if (!isPasswordMatching) {
      return { success: false, message: 'password does not match' }
    }

    session.set('user', {
      isLoggedIn: true,
      username: body.username,
      role: existingUser.role,
    })
    await session.save()

    return {
      success: true,
      isLoggedIn: true,
      message: 'you have successfully logged in',
    }
  } else {
    userSchema
      .validate({ username: body.username, password: body.password })
      .catch((error) => {
        return { success: false, error }
      })
  }
}

export const createUserWithSession = async (body, session) => {
  const isValid = userSchema.isValid({
    username: body.username,
    password: body.password,
  })

  if (isValid) {
    const existingUser = await prisma.user.findOne({
      where: { username: body.username },
    })
    if (existingUser) {
      return { success: false, message: 'username already exists' }
    }

    const passwordHash = await bcrypt.hash(body.password, 8)
    await prisma.user.create({
      data: {
        username: body.username,
        password: passwordHash,
      },
    })

    session.set('user', {
      isLoggedIn: true,
      username: body.username,
      role: 'USER',
    })
    await session.save()

    return {
      success: true,
      isLoggedIn: true,
      message: 'you have successfully signed up',
    }
  } else {
    userSchema
      .validate({ username: body.username, password: body.password })
      .catch((error) => {
        return { success: false, error }
      })
  }
}

export const getUser = async (session) => {
  const user = session.get('user')

  if (user) {
    const userDetails = await prisma.user.findOne({
      where: { username: user.username },
    })
    delete userDetails.password

    return { isloggedIn: true, userDetails }
  } else {
    return { isloggedIn: false }
  }
}
