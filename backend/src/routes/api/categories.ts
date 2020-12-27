import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  try {
    res.send([
      {
        name: 'Спорт',
        id: 0,
        slug: 'sport',
        icon: {
          url: {
            svg: ''
          }
        }
      }
    ])
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
