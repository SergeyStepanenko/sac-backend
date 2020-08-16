import express from 'express'
import * as db from '../../db'

const router = express.Router()

router.get('/', async (req, res) => {
  const items = await db.items.get()

  res.send(items)
})

router.post('/', async (req, res) => {
  const { title, description } = req.body as db.items.ISacItem

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

router.delete('/', async (req, res) => {
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
