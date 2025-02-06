const express = require('express')
const cors = require('cors')
require('dotenv').config()

const router = require('./src/routes/routes')

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`Aplicação esta rodando na porta ${process.env.PORT}`)
})

app.get('/', (request, response) => {
    response.send('Olá mundo!')
})