import React from "react";
import { BtnIcon } from "../UI/button/btn-icon/BtnIcon";
import { MyTextarea } from "../UI/input/areatext/MyTextarea";
import style from './TaskItem.module.less'


export const TaskItem = ({ item, children }) => {
    const {
        idx,
        task,
        handlerOpen,
        changeHandlerTitle,
        saveHandler,

    } = item

    const propsTextarea = {
        idx: idx,
        name: 'title',
        placeholder: '...',
        changeHandler: changeHandlerTitle,
        value: task.title,
        blurHandlerTextarea: saveHandler,
    }
    console.log('TASK ITEM =', task)
    return (
        <div className={style.container} onClick={() => handlerOpen(idx)}>

            <div className={style.left}>
                {task.id === '' ?
                    <MyTextarea props={propsTextarea} />
                    :
                    <span>{task.title}</span>
                }
                <span>{task.dateBegin}</span>
                <span>{task.dateFinish}</span>
            </div>

            <div className={style.right}>
                {children}
            </div>

        </div>

    )
}