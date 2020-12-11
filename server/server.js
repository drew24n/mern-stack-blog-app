const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const notesRoute = require('./api/notes')

const {env: {MONGO_URI}} = require('./config')
const whiteList = ['https://blog-notes.netlify.app', 'http://localhost:3000']
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json({limit: '10mb', extended: false}))
app.use(cors({credentials: true, origin: whiteList}))
app.use(notesRoute)

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => {
        app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
    })
    .catch(error => console.log(error))