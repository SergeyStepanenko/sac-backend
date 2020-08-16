import express, { Request, Response } from 'express'
import * as db from '../../db'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const items = await db.items.get()

  res.send(items)
})

router.post('/', async (req: Request, res: Response) => {
  const { title, description } = req.body

  if (typeof title !== 'string' || typeof description !== 'string') {
    res.status(422).send({ error: 'Ошибка валидации' })

    return
  }

  const item = await db.items.add({
    title,
    description
  })

  res.send(item)
})

router.put('/', async (req: Request, res: Response) => {
  const { id, title, description } = req.body as db.items.ISacItem & {
    id: string
  }

  if (typeof title !== 'string' || typeof description !== 'string') {
    res.status(422).send({ error: 'Ошибка валидации' })

    return
  }

  const item = await db.items.findAndUpdate({
    id,
    title,
    description
  })

  if (item === null) {
    res.status(404).send({ error: `Элемент с id: ${id} не найден` })

    return
  }

  res.send(item)
})

router.delete('/', async (req: Request, res: Response) => {
  const { id } = req.body

  if (typeof id !== 'string') {
    res.status(422).send({ error: 'Ошибка валидации' })

    return
  }

  const item = await db.items.remove({ id })

  if (!item) {
    res.status(404).send({ error: `Не найдено` })

    return
  }

  res.send(item)
})

export default router
