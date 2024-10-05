const pageByName = async (pageName) => {
  try {
    let response = await fetch(`/api/pages/${pageName}`, {
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
  pageByName
}