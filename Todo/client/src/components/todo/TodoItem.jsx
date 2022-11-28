import React from "react";
import { InputTodo } from "../UI/input/input-text-todo/InputTodo";
import { MyCheckbox } from '../UI/check/MyCheckbox'
import style from './TodoItem.module.less'
import iHandler from '../../source/icons/bx-trash-alt.svg'
import { MyTextarea } from "../UI/input/areatext/MyTextarea";
export const TodoItem = ({ props }) => {
    const {
        propsInput,
        propsCheck,
        propsTextarea
    } = props
    return (
        <div className={style.container}>
            <MyCheckbox props={propsCheck} />
            {/* <InputTodo props={propsInput} /> */}
            <MyTextarea props={propsTextarea} />
        </div>
    )
}