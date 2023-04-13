import dotenv from "dotenv";
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import router from './src/router/getparking.js'
import releaseRouter from './src/router/releaseParking.js'
import unboardRouter from './src/router/unboardRouter.js'
const app = express()
app.options('*', cors()) // include before other routes 
app.use(
    cors({
      allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
      exposedHeaders: ["authorization"], // you can change the headers
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false
    })
  );

mongoose.connect(process.env.DATABASE_URL, {useNewURlParser: true})
const db = mongoose.connection
db.on('erroe', (error) => console.log(error))
db.on('open', () => console.log('Server Started'))


const port = 5000

app.use(bodyParser.json())

app.use('/getSlot', router)
app.use('/releaseSlot', releaseRouter)
app.use('/unboardParking', unboardRouter)

app.listen(port, () => console.log(`app is listining to port: ${port}`))