import React, {useEffect} from 'react';
import styles from './PostsPage.module.scss';
import {getNotes, setPageNumber} from "../../redux/notesReducer";
import PostItem from "../PostItem/PostItem";
import {Pagination} from "antd";
import * as queryString from "query-string";

export default function PostsPage({dispatch, notes, pageNumber, totalCount, history}) {
    const {page} = queryString.parse(history.location.search)

    useEffect(() => {
        if (page && +page !== pageNumber) {
            dispatch(setPageNumber(+page))
        } else {
            dispatch(getNotes(pageNumber))
        }
    }, [dispatch, pageNumber, page])

    const paginationHandler = (page) => {
        history.push(`?page=${page}`)
        window.scrollTo({top: 0})
        dispatch(setPageNumber(page))
    }

    return (
        <main className={styles.container}>
            <h1>All Posts</h1>
            <PostItem notes={notes}/>
            <Pagination defaultCurrent={1} current={pageNumber} total={totalCount}
                        onChange={paginationHandler} pageSize={3}/>
        </main>
    )
}