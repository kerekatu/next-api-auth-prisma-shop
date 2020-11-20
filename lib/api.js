export const handleLogout = async (callback) => {
  const response = await fetch('/api/auth/logout')

  if (!response.ok) throw new Error(response.statusText)

  callback()
}

export const handleLogin = async (data) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response.json()
}
