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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
  const data = await response.json()

  return data
}
