import React from 'react';
import styles from './NotFound.module.scss';
import {NavLink} from "react-router-dom";
import {Button} from "antd";

export default function NotFound() {
    return (
        <main className={styles.container}>
            <p>Page was not found :(</p>
            <NavLink to={'/'}>
                <Button type={'primary'}>Back to home</Button>
            </NavLink>
        </main>
    )
}
