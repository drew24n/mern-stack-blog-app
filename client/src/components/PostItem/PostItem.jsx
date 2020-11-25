import React from 'react';
import styles from './PostItem.module.scss';
import {bufferToBase64} from "../../utils/bufferToBase64";
import {NavLink} from "react-router-dom";

export default function PostItem({notes}) {
    const dateFormat = (date) => new Date(date)
        .toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})

    return (
        <>
            {notes.map(n => {
                return (
                    <section key={n._id} className={styles.container}>
                        {n.imageType && n.image.data ?
                            <img src={`data:${n.imageType};base64, ${bufferToBase64(n.image.data)}`} alt={'post text'}/>
                            : null}
                        <div className={styles.content}>
                            <h2>{n.title} - {dateFormat(n.date)}</h2>
                            <p>{n.text}</p>
                            <NavLink exact to={`/post?id=${n._id}`}>read more...</NavLink>
                        </div>
                    </section>
                )
            })}
        </>
    )
}
