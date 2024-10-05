const login = async (credentials) => {
  try {
    let response = await fetch('/auth/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(credentials)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
    return {error: err}
  }
}

const verifyToken = async (credentials) => {
  try {
    let response = await fetch('/auth/verify-token/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.token
      },
    })
    return await response.json()
  } catch(err) {
    console.log(err)
    return {error: err}
  }
}

export {
  verifyToken,
  login,
}