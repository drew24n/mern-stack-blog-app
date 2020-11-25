import {notesApi} from "../api/notes";
import {notificationError, notificationSuccess} from "../utils/notifications";

const SET_NOTES = "SET_NOTES"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const ADD_NEW_NOTE = "ADD_NEW_NOTE"
const DELETE_NOTE = "DELETE_NOTE"
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"
const SET_PAGE_NUMBER = "SET_PAGE_NUMBER"
const SET_IS_MODAL_VISIBLE = "SET_IS_MODAL_VISIBLE"

const initialState = {
    notes: [],
    pageNumber: 1,
    totalCount: 0,
    isModalVisible: false,
    isFetching: false
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTES:
            return {
                ...state, notes: [...action.notes]
            }
        case SET_TOTAL_COUNT:
            return {
                ...state, totalCount: action.totalCount
            }
        case SET_PAGE_NUMBER:
            return {
                ...state, pageNumber: action.pageNumber
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
        case SET_IS_MODAL_VISIBLE:
            return {
                ...state, isModalVisible: action.isModalVisible
            }
        default:
            return state
    }
}

const setNotes = (notes) => ({type: SET_NOTES, notes})
const addNewNote = (newNote) => ({type: ADD_NEW_NOTE, newNote})
const deleteNoteAction = (id) => ({type: DELETE_NOTE, id})
const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount})
export const setPageNumber = (pageNumber) => ({type: SET_PAGE_NUMBER, pageNumber})
export const setIsModalVisible = (isModalVisible) => ({type: SET_IS_MODAL_VISIBLE, isModalVisible})

export const getNotes = (pageNumber) => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const {success, data: {notes, totalCount}} = await notesApi.getNotes(pageNumber)
        if (success) {
            dispatch(setNotes(notes))
            dispatch(setTotalCount(totalCount))
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
            dispatch(setNotes([data]))
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

export const getLatestNote = () => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const {success, data} = await notesApi.getLatestNote()
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
        const res = await notesApi.delete(id)
        if (res.success) {
            dispatch(deleteNoteAction(id))
            notificationSuccess('Note has been deleted!')
            return res
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