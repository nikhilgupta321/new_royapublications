const list = async (credentials) => {
  try {
    let response = await fetch('/api/journals/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
    return {error: err}
  }
}

export {
  list
}