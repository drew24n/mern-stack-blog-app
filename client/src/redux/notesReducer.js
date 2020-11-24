import {notesApi} from "../api/notes";
import {notificationError, notificationSuccess} from "../utils/notifications";

const SET_NOTES = "SET_NOTES"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const ADD_NEW_NOTE = "ADD_NEW_NOTE"
const DELETE_NOTE = "DELETE_NOTE"

const initialState = {
    notes: [],
    isFetching: false
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTES:
            return {
                ...state, notes: [...action.notes]
            }
        case ADD_NEW_NOTE:
            return {
                ...state, notes: [...state.notes, action.newNote]
            }
        case DELETE_NOTE:
            return {
                ...state, notes: state.notes.filter(note => {
                    if (note._id !== action.id) {
                        return note
                    } else {
                        return undefined
                    }
                })
            }
        case SET_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        default:
            return state
    }
}

const setNotes = (notes) => ({type: SET_NOTES, notes})
const addNewNote = (newNote) => ({type: ADD_NEW_NOTE, newNote})
const deleteNoteAction = (id) => ({type: DELETE_NOTE, id})
const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})

export const getNotes = () => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const {success, data} = await notesApi.getNotes()
        if (success) {
            dispatch(setNotes(data))
        }
    } catch (error) {
        if (error.response) {
            notificationError(error.response.data.error)
        } else {
            notificationError(error)
        }
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const getNote = (id) => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const {success, data} = await notesApi.getNote(id)
        if (success) {
            dispatch(setNotes(data))
        }
    } catch (error) {
        if (error.response) {
            notificationError(error.response.data.error)
        } else {
            notificationError(error)
        }
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const newNote = ({title, text, photo}) => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const {success, data} = await notesApi.newNote({title, text, photo})
        if (success) {
            dispatch(addNewNote(data))
            notificationSuccess(`Note has been added!`)
        }
        return {success}
    } catch (error) {
        if (error.response) {
            notificationError(error.response.data.error)
        } else {
            notificationError(error)
        }
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const deleteNote = (id) => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const {success} = await notesApi.delete(id)
        if (success) {
            dispatch(deleteNoteAction(id))
            notificationSuccess('Note has been deleted!')
        }
    } catch (error) {
        if (error.response) {
            notificationError(error.response.data.error)
        } else {
            notificationError(error)
        }
    } finally {
        dispatch(setIsFetching(false))
    }
}