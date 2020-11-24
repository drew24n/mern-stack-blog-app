import React, {useEffect} from 'react';
import styles from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {Route, Switch, useHistory} from "react-router-dom";
import {notificationError} from "./utils/notifications";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import PostPage from "./components/PostPage/PostPage";
import NewPost from "./components/NewPost/NewPost";
import PostsPage from "./components/PostsPage/PostsPage";

export default function App() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        window.addEventListener("unhandledrejection", error => notificationError(error))
    }, [])

    return (
        <div className={styles.container}>
            <NavBar history={history}/>
            <Switch>
                <Route exact path={'/'}
                       render={() => <Home notes={state.notes} isFetching={state.isFetching} dispatch={dispatch}/>}/>
                <Route exact path={'/posts'}
                       render={() => <PostsPage notes={state.notes} isFetching={state.isFetching}
                                                dispatch={dispatch} pageNumber={state.pageNumber}
                                                totalCount={state.totalCount} history={history}/>}/>
                <Route path={'/post'} render={() => <PostPage notes={state.notes} isFetching={state.isFetching}
                                                              dispatch={dispatch}/>}/>
                <Route path={'/new-post'} render={() => <NewPost history={history} dispatch={dispatch}/>}/>
                <Route render={() => <NotFound/>}/>
            </Switch>
        </div>
    )
}
