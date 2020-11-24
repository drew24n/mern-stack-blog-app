import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000'
        : 'https://my-blog-notes.herokuapp.com',
    withCredentials: true
})

export const notesApi = {
    newNote({title, text, photo}) {
        return instance.post('/api/notes', {title, text, photo}).then(res => res.data)
    },
    getNotes() {
        return instance.get('/api/notes').then(res => res.data)
    },
    getNote(id) {
        return instance.get(`/api/notes?id=${id}`).then(res => res.data)
    },
    delete(id) {
        return instance.delete(`/api/notes?id=${id}`).then(res => res.data)
    }
}