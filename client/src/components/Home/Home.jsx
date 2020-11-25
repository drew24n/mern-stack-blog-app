import React, {useEffect} from 'react';
import styles from './Home.module.scss';
import {getLatestNote} from "../../redux/notesReducer";
import PostItem from "../PostItem/PostItem";

export default function Home({dispatch, notes}) {
    useEffect(() => {
        dispatch(getLatestNote())
    }, [dispatch])

    return (
        <main className={styles.container}>
            <h1>Latest Post</h1>
            <PostItem notes={notes}/>
        </main>
    )
}