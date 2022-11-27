import React from "react";
import style from './DetailTaskItem.module.less'
import { HandySvg } from "handy-svg";
import iFile from '../../source/icons/bx-file.svg'
import iAdd from '../../source/icons/bx-plus.svg'
import { Title } from "../title/Title";
import { BtnIcon } from "../UI/button/btn-icon/BtnIcon";
import { InputText } from "../UI/input/input-text/InputText";
import { InputTodo } from "../UI/input/input-text-todo/InputTodo";

import iLogo from '../../source/icons/bx-heart.svg'
import iHandler from '../../source/icons/bx-trash-alt.svg'
import { TodoItem } from "../todo/TodoItem";


export const DetailTaskItem = () => {
    const propsTodoTitle = {
        icon: null,
        handler1: () => { },
        title: '',
        text: 'Список задач:'
    }

    const propsInputTodo = {
        name: 'todo',
        placeholder: 'Добавить элемент...',
        iHandler: iHandler,
        btnHandler: () => { console.log('delete todo item') },
        changeHandler: () => { },
        // value: 1234,
        autoFocus: false,
    }

    const propsTodoItem = {
        propsInput: {
            name: 'todo',
            placeholder: 'Добавить элемент...',
            iHandler: iHandler,
            btnHandler: () => { console.log('delete todo item') },
            changeHandler: () => { },
            // value: 1234,
            autoFocus: false,
            checked: false
        },
        propsCheck: {
            handler: () => { },
            checked: false
        }
    }
    return (
        <div className={style.container}>

            <span className={style.description}>
                Описание:
            </span>

            <span className={style.file}>
                <BtnIcon icon={iFile} handler={() => { }} width={20} height={20}>
                    Файлы:
                </BtnIcon>
            </span>

            <div className={style.time}>
                Time
            </div>

            <div className={style.todo}>

                <Title props={propsTodoTitle}>
                    <BtnIcon icon={iAdd} handler={() => { }} />
                </Title>

                <TodoItem props={propsTodoItem} />
                <TodoItem props={propsTodoItem} />
                <TodoItem props={propsTodoItem} />
                <TodoItem props={propsTodoItem} />
                <TodoItem props={propsTodoItem} />

                <InputText props={propsInputTodo} />

            </div>
        </div>
    )
}