import React from "react";
import { Title } from "../title/Title";
import { BtnIcon } from "../UI/button/btn-icon/BtnIcon";
import { InputFile } from "../UI/input/input-file/InputFile";
import { TodoItem } from "../todo/TodoItem";
import { ListCol } from '../UI/list/list-column/ListCol'
import { MyTextarea } from "../UI/input/areatext/MyTextarea";
import { InputDate } from "../UI/input/input-date/InputDate";
import { MyCheckbox } from "../UI/check/MyCheckbox";
import iClock from '../../source/icons/bxs-watch.svg'
import iDel from '../../source/icons/bx-trash-alt.svg'
import iFile from '../../source/icons/bx-file.svg'
import iAdd from '../../source/icons/bx-plus.svg'
import style from './DetailTaskItem.module.less'
import iBack from '../../source/icons/bx-x.svg'

export const DetailTaskItem = ({ item }) => {
    const {
        task,
        propsTitle,
        propsInfo,
        propsDateBegin,
        propsDateFinish,
        propsFinishCheck,
    } = item

    // title
    const propsAreaTitle = {
        icon: iBack,
        handler: propsTitle.handler,
        propsTextarea: {
            name: 'title',
            placeholder: '...',
            iHandler: iDel,
            btnHandler: propsTitle.propsTextarea.btnHandler,
            changeHandler: propsTitle.propsTextarea.changeHandler,
            value: propsTitle.propsTextarea.value,
            blurHandlerTextarea: propsTitle.propsTextarea.blurHandlerTextarea
        }
    }
    //info 
    const propsTextareaInfo = {
        name: 'info',
        placeholder: '...',
        changeHandler: propsInfo.changeHandler,
        value: propsInfo.value,
        blurHandlerTextarea: propsInfo.blurHandlerTextarea
    }
    // DateBegin
    const propsInputDateBegin = {
        icon: iClock,
        placeholder: 'Начало',
        name: 'dateBegin',
        value: propsDateBegin.value,
        changeHandler: propsDateBegin.changeHandler,
        blurHandler: propsDateBegin.blurHandler
    }
    // DateFinish
    const propsInputDateFinish = {
        placeholder: 'Окончание',
        name: 'dateFinish',
        value: propsDateFinish.value,
        changeHandler: propsDateFinish.changeHandler,
        blurHandler: propsDateFinish.blurHandler
    }
    // DateFinishCheck
    const propsDateFinishCheck = {
        handler: () => { },
        checked: true
    }

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



    const propsAreaTodo = {
        name: 'todo',
        placeholder: 'Добавить элемент...',
        changeHandler: () => { },
        type: false
    }
    const propsTodoItem = [
        {
            propsCheck: {
                handler: () => { },
                checked: true
            },
            propsTextarea: {
                name: 'todo',
                placeholder: '...',
                changeHandler: () => { },
                autoFocus: false,
                iHandler: iDel,
                btnHandler: () => { console.log('delete todo item') },
                checked: false,
                type: true
            }
        },
    ]

    return (
        <div className={style.container}>

            <TodoItem props={propsAreaTitle} />
            <hr />
            <div className={style.description}>
                Описание:
                <MyTextarea props={propsTextareaInfo} />
            </div>
            <hr />
            <span className={style.file}>
                <InputFile props={propsInputFile} />
            </span>
            <hr />
            <div className={style.time}>
                <InputDate props={propsInputDateBegin} />
                <hr />
                <div className={style.time2}>
                    <InputDate props={propsInputDateFinish} />
                    <MyCheckbox props={propsDateFinishCheck} />
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