import React, {useEffect} from 'react';
import styles from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {Route, Switch, useHistory} from "react-router-dom";
import {notificationError} from "./utils/notifications";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import AllPosts from "./components/AllPosts/AllPosts";
import Post from "./components/Post/Post";
import NewPost from "./components/NewPost/NewPost";

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
                <Route exact path={'/'} render={Home}/>
                <Route path={'/all-posts'} render={AllPosts}/>
                <Route path={'/post'} render={Post}/>
                <Route path={'/new-post'} render={NewPost}/>
                <Route render={() => <NotFound/>}/>
            </Switch>
        </div>
    )
}
