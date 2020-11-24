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
            } catch (e) {
                res.status(400).json({success: false, error: e})
            }
        })
    }
}

notesApi.post()

module.exports = notesApi