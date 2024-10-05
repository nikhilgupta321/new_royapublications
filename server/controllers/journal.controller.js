import Journal from '../models/journals.model'

const list = async (req, res) => {
  try {
    let journals = await Journal.findAll()
    res.json(journals)
  } catch (err) {
    console.log(err)
    return {error: err}
  }
}

export default { list }