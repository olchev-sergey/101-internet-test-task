const express = require('express')
const cors = require('cors')
const { connectMongodb } = require('./connectMongodb')
const providerRoute = require('./routes/provider')

const app = express()
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectMongodb().then(() => {
  startServer()
})

const PORT = process.env.PORT || 4444

const startServer = () => {
  app.use((req, res, next) => {
    console.log(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    )

    next()
  })

  app.use('/api', providerRoute)

  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
  })
}
