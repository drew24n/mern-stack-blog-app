import React, {useEffect} from 'react';
import styles from './Home.module.scss';
import {getLatestNote} from "../../redux/notesReducer";
import PostItem from "../PostItem/PostItem";
import {Spin} from "antd";

export default function Home({dispatch, notes, isFetching}) {
    useEffect(() => {
        dispatch(getLatestNote())
    }, [dispatch])

    return (
        <main className={styles.container}>
            <Spin size="large" spinning={isFetching}>
                <h1>Latest Post</h1>
                <PostItem notes={notes}/>
            </Spin>
        </main>
    )
}