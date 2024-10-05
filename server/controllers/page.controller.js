import Page from '../models/pages.model'

const pageByName = async (req, res) => {
  try {
    let pages = await Page.findOne({ where: { name: req.params.pageName } })
    res.json(pages)
  } catch (err) {
    console.log(err)
    return {error: err}
  }
}

export default { pageByName }