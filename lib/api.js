export const handleLogout = async (callback) => {
  const response = await fetch('/api/auth/logout')
  const data = await response.json()

  if (!data.success) throw new Error(response.statusText)

  return callback(data)
}

export const handleLogin = async (values) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
  const data = await response.json()

  return data
}

export const handleUser = async () => {
  const response = await fetch('/api/auth/user')
  const user = await response.json()

  return user
}

export const handlePostMulti = async (url, values) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: JSON.stringify(values)
  })
  const data = await response.json()

  return data
}

export const handlePost = async (url, values) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: values && JSON.stringify(values)
  })
  const data = await response.json()

  return data
}

export const handleUpdate = async (url, values) => {
  console.log(values)
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
  console.log(response)
  const data = await response.json()
  console.log(data)

  return data
}

export const handleUpdateMulti = async (url, values) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: values && JSON.stringify(values)
  })
  const data = await response.json()

  return data
}

export const handleDelete = async (url) => {
  const response = await fetch(url, {
    method: 'DELETE'
  })
  const data = await response.json()

  return data
}
