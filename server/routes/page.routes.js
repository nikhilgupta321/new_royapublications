import express from 'express'
import pageCtrl from '../controllers/page.controller'

const router = express.Router()

router.route('/api/pages/:pageName')
  .get(pageCtrl.pageByName)

export default router