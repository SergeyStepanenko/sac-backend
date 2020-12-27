import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import routes from './routes'

dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/items', routes.items)
app.use('/categories', routes.categories)

async function start() {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
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
