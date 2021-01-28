import express, { Request, Response } from 'express'
import { CATEGORIES } from '../../constants/categories'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  try {
    res.send(CATEGORIES)
  } catch (error) {
    res.send({
      error: {
        message: 'Не удалось получить данные категорий',
        error
      }
    })
  }
})

export default router
