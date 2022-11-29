import React from "react";
import { BtnIcon } from "../UI/button/btn-icon/BtnIcon";
import { MyTextarea } from "../UI/input/areatext/MyTextarea";
import style from './TaskItem.module.less'


export const TaskItem = ({ item, children }) => {
    const {
        idx,
        task,
        handlerOpen,
        changeHandlerTitle
    } = item

    const propsTextarea = {
        idx: idx,
        name: 'title',
        placeholder: '...',
        changeHandler: changeHandlerTitle,
        value: task.title,
    }

    return (
        <div className={style.container} onClick={() => handlerOpen(idx)}>

            <div className={style.left}>
                <MyTextarea props={propsTextarea} />
                <span>{task.date_begin}</span>
                <span>{task.date_finish}</span>
            </div>

            <div className={style.right}>
                {children}
            </div>

        </div>

    )
}