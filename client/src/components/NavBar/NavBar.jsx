import React from 'react';
import styles from './NavBar.module.scss';
import {NavLink} from "react-router-dom";
import {Button} from "antd";

export default function NavBar() {
    return (
        <nav className={styles.container}>
            <div className={styles.navLeft}>
                <NavLink activeClassName={styles.active} exact to={'/'}>Home</NavLink>
                <NavLink activeClassName={styles.active} exact to={'/posts'}>All posts</NavLink>
            </div>
            <div className={styles.navRight}>
                <NavLink exact to={'/new-post'}>
                    <Button type={'primary'}>Create</Button>
                </NavLink>
            </div>
        </nav>
    )
}
