const mongoose = require('mongoose')

const notesSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'is required'],
        trim: true,
        maxlength: [100, 'cannot be longer than 100 characters']
    },
    text: {
        type: String,
        required: [true, 'is required'],
        trim: true,
        maxlength: [2000, 'cannot be longer than 2000 characters']
    },
    date: {type: Date, default: Date.now},
    image: {
        type: Buffer
    },
    imageType: {
        type: String
    }
})

notesSchema.virtual('imagePath').get(function () {
    if (this.image && this.imageType) {
        return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
    }
})

module.exports = mongoose.model('Notes', notesSchema)