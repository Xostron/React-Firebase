import React from "react";
import { BtnIcon } from "../UI/button/btn-icon/BtnIcon";
import style from './TaskItem.module.less'
import iDel from '../../source/icons/bx-trash-alt.svg'

export const TaskItem = ({ item, children }) => {
    const {
        id,
        title,
        date_create,
        date_finish,
        handlerOpen,
    } = item
    return (
        <div className={style.container} onClick={handlerOpen}>
            <div className={style.left}>
                <span>{id} {title}</span>
                <span>{date_create}</span>
                <span>{date_finish}</span>
            </div>
            <div className={style.right}>
                {children}
            </div>
        </div>
    )
}