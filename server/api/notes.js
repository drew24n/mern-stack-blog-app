const app = require('../server')
const Notes = require('../models/notes')

const notesApi = {
    post() {
        return app.post('/api/notes', async (req, res) => {
            try {
                const note = {
                    title: req.body.title,
                    text: req.body.text
                }

                const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

                function addImage(note, imageEncoded) {
                    if (!imageEncoded) return
                    // const image = await JSON.parse(imageEncoded)
                    if (imageEncoded && imageMimeTypes.includes(imageEncoded.type)) {
                        note.image = new Buffer.from(imageEncoded.data, 'base64')
                        note.imageType = imageEncoded.type
                    }
                }

                addImage(note, req.body.image)

                const newNote = await Notes.create(note)
                res.status(201).json({success: true, data: newNote})
            } catch (error) {
                res.status(400).json({success: false, error: error.message})
            }
        })
    },
    get() {
        return app.get('/api/notes', async (req, res) => {
            if (req.query.id) {
                try {
                    const note = await Notes.findById(req.query.id)
                    if (note) {
                        res.status(200).json({success: true, data: note})
                    } else if (!note) {
                        res.status(400).json({success: false, error: 'Note was not found'})
                    }
                } catch (error) {
                    res.status(400).json({success: false, error: error.message})
                }
            } else {
                try {
                    const page = req.query.page ? parseInt(req.query.page) : 1
                    const size = req.query.size ? parseInt(req.query.size) : 5
                    const notes = await Notes.find()
                        .skip((page - 1) * size)
                        .limit(size)
                    const totalCount = await Notes.countDocuments()
                    res.status(200).json({success: true, data: {notes, totalCount}})
                } catch (error) {
                    res.status(400).json({success: false, error: error.message})
                }
            }
        })
    },
    delete() {
        return app.delete('/api/notes', async (req, res) => {
            try {
                const note = await Notes.deleteOne({_id: req.query.id})
                if (note.n) {
                    res.status(200).json({success: true, data: {}})
                } else if (!note.n) {
                    res.status(400).json({success: false, error: 'Note was not found. Nothing to delete'})
                }
            } catch (error) {
                res.status(400).json({success: false, error: error.message})
            }
        })
    },
    put() {
        return app.put('/api/notes', async (req, res) => {
            try {
                const note = await Notes.findByIdAndUpdate(req.query.id, req.body, {new: true, runValidators: true})
                if (note) {
                    res.status(201).json({success: true, data: note})
                } else if (!note) {
                    res.status(400).json({success: false, error: 'Note was not found. Nothing to updated'})
                }
            } catch (error) {
                res.status(400).json({success: false, error: error.message})
            }
        })
    }
}

notesApi.post()
notesApi.get()
notesApi.delete()
notesApi.put()

module.exports = notesApi