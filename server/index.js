const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const {env: {MONGO_URI}} = require('./config')

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('database connected'))
    .catch(error => console.log(error))

const app = express()

const whiteList = ['https://blog-notes.netlify.app', 'http://localhost:3000']

app.use(express.json())
app.use(cors({credentials: true, origin: whiteList}))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))

module.exports = app