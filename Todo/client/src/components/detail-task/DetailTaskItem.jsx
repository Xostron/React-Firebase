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
import { ListCol } from '../UI/list/list-column/ListCol'
import { MyTextarea } from "../UI/input/areatext/MyTextarea";
import { InputDate } from "../UI/input/input-date/InputDate";
import iClock from '../../source/icons/bxs-watch.svg'
import { InputFile } from "../UI/input/input-file/InputFile";
export const DetailTaskItem = () => {
    const propsTodoTitle = {
        icon: null,
        handler1: () => { },
        title: '',
        text: 'Список задач:'
    }

    const propsInputFile = {
        icon: iFile,
        name: 'Файлы:'
    }
    const propsInputDateBegin = {
        icon: iClock,
        placeholder: 'Начало'
    }
    const propsInputDateFinish = {
        // icon: iClock,
        placeholder: 'Окончание'
    }
    const propsAreaTodo = {
        name: 'todo',
        placeholder: 'Добавить элемент...',
        changeHandler: () => { },
        // value: 1234,
    }
    const propsTextarea = {
        name: 'todo',
        placeholder: '...',
        changeHandler: () => { },
        // value: 1234,

    }
    const propsTodoItem = [
        {
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
            },
            propsTextarea: {
                name: 'todo',
                placeholder: '...',
                changeHandler: () => { },
                // value: 1234,

            }
        },
    ]

    return (
        <div className={style.container}>

            <span className={style.description}>
                Описание:
                <MyTextarea props={propsTextarea} />
            </span>

            <span className={style.file}>
                <InputFile props={propsInputFile} />
            </span>

            <div className={style.time}>
                <InputDate props={propsInputDateBegin} />
                <hr />
                <div className={style.time2}>
                    <InputDate props={propsInputDateFinish} />
                </div>

            </div>

            <div className={style.todo}>

                <Title props={propsTodoTitle}>
                    <BtnIcon icon={iAdd} handler={() => { }} />
                </Title>

                <ListCol
                    item={propsTodoItem}
                    renderItem={(val, idx) => { return (<TodoItem key={idx} props={val} />) }}
                />

                <div className={style.todo2}>
                    <MyTextarea props={propsAreaTodo} />
                </div>


            </div>
        </div>
    )
}