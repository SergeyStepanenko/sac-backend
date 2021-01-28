import express, { Request, Response } from 'express'
import { getItemFromRequest, getItemWithIdFromRequest } from './utils'
import * as db from '../../db'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    if (req.query.title) {
      const { title, limit } = req.query

      res.send(
        await db.items.get({
          title: title as string,
          limit: Number(limit)
        })
      )
    }

    res.send(await db.items.get())
  } catch (error) {
    res.send({
      error: {
        message: 'Не удалось получить данные',
        error
      }
    })
  }
})

router.post('/', async (req: Request, res: Response) => {
  const itemData = getItemFromRequest(req)

  if (!itemData) {
    res.status(422).send({ error: { message: 'Ошибка валидации' } })

    return
  }

  try {
    res.send(await db.items.add(itemData))
  } catch (error) {
    res.send({
      error: {
        message: 'При добавлении элемента возникла ошибка',
        error
      }
    })
  }
})

router.put('/', async (req: Request, res: Response) => {
  const itemData = getItemWithIdFromRequest(req)

  if (!itemData) {
    res.status(422).send({ error: { message: 'Ошибка валидации' } })

    return
  }

  const item = await db.items.findAndUpdate(itemData)

  if (item === null) {
    res.status(404).send({ error: `Элемент с id: ${item.id} не найден` })

    return
  }

  res.send(item)
})

router.delete('/', async (req: Request, res: Response) => {
  const { id: itemId } = req.body

  if (!itemId || typeof itemId !== 'string') {
    res.status(422).send({ error: 'Передан невалидный id элемента' })

    return
  }

  const item = await db.items.remove(itemId)

  if (!item) {
    res.status(404).send({ error: `Не найдено` })

    return
  }

  res.send(item)
})

export default router
