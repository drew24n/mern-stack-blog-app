import React, {useEffect} from 'react';
import styles from './PostPage.module.scss';
import * as queryString from "query-string";
import PostItem from "../PostItem/PostItem";
import {deleteNote, getNote, setIsModalVisible} from "../../redux/notesReducer";
import {Button} from "antd";
import CustomModal from "../CustomModal/CustomModal";

export default function PostPage({dispatch, notes, history, isModalVisible}) {
    const {id} = queryString.parse(history.location.search)

    async function deletePostHandler() {
        const res = await dispatch(deleteNote(notes[0]._id))
        if (res.success === true) {
            history.push('/')
        }
    }

    useEffect(() => {
        dispatch(getNote(id))
    }, [dispatch, id])

    return (
        <main className={styles.container}>
            <CustomModal isVisible={isModalVisible} handleCancel={() => dispatch(setIsModalVisible(false))}
                         title={'Delete this post?'} handleOk={deletePostHandler}/>
            <PostItem notes={notes}/>
            <Button className={styles.delBtn} type={'danger'} onClick={() => dispatch(setIsModalVisible(true))}>
                Delete post
            </Button>
        </main>
    )
}
