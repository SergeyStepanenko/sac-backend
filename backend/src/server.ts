import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { getItems, addItem, ISacItem } from './db/item'

dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get('/items', async (req, res) => {
  const items = await getItems()

  res.send(items)
})

app.post('/items', async (req, res) => {
  const { title, description } = req.body as ISacItem

  if (typeof title !== 'string' || typeof description !== 'string') {
    res.status(422).send({ error: 'Ошибка валидации' })

    return
  }

  const item = await addItem({
    title,
    description
  })

  res.send(item)
})

async function start() {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const PORT = process.env.PORT || 5000

    app.listen(PORT)

    console.log(`
      Connected to DB successfuly
      http://localhost:${PORT}
    `)
  } catch (error) {
    console.error(error)
  }
}

start()
