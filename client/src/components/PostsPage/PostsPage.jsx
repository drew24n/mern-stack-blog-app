import React, {useEffect} from 'react';
import styles from './PostsPage.module.scss';
import {getNotes, setPageNumber} from "../../redux/notesReducer";
import PostItem from "../PostItem/PostItem";
import {Pagination, Spin} from "antd";
import * as queryString from "query-string";

export default function PostsPage({dispatch, notes, isFetching, pageNumber, totalCount, history}) {
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
        dispatch(setPageNumber(page))
    }

    return (
        <main className={styles.container}>
            <Spin size="large" spinning={isFetching}>
                <h1>All Posts</h1>
                <PostItem notes={notes}/>
            </Spin>
            <Pagination defaultCurrent={1} current={pageNumber} total={totalCount}
                        onChange={paginationHandler} pageSize={5}/>
        </main>
    )
}