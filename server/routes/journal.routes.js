import express from 'express'
import journalCtrl from '../controllers/journal.controller'

const router = express.Router()

router.route('/api/journals/')
  .get(journalCtrl.list)

export default router