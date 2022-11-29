import React, { useState, useEffect, useRef } from "react";
import style from './MyTextarea.module.less'
import { HandySvg } from 'handy-svg'


export const MyTextarea = ({ props }) => {
    const styleArea = [style.myTextarea]
    const {
        name,
        placeholder,
        changeHandler,
        value,
        autofocus,
        checked,
        type,
        iHandler,
        btnHandler,
    } = props

    // статус - зачеркнутый текст
    if (checked) {
        styleArea.push(style.active)
    }
    // border-bottom
    if (type) {
        styleArea.push(style.onBorder)
    }
    // кнопка - удалить элемент (задачу)
    const [focus, setFocus] = useState(false)
    const focusHandler = (e) => {
        setFocus(true)
        e.stopPropagation()
    }
    const blurHandler = (e) => {
        setFocus(false)
        e.stopPropagation()
    }

    // autosize
    const ref = useRef()
    const [rows, setRows] = useState(0)

    // onChange - событие для обработки текста
    const handler = (e) => {

        // props handler
        changeHandler()
        // высота содержимого areatext
        console.log('onchange', ref.current.scrollHeight, ref.current.scrollTop)
        setRows(ref.current.scrollHeight)
    }
    // autosize
    useEffect(() => {
        let str = ref.current.style.height.match(/[0-9]/g) || []
        let val = Number(str.join(''))
        // console.log('testarea= ', ref.current.scrollHeight, val)
        if (ref.current.scrollHeight > val) {
            ref.current.style.height = `${ref.current.scrollHeight}px`;
            // console.log('if = ', val, rows)
        }
        else if (val === (ref.current.scrollHeight + 1)) {
            if (ref.current.value === '') {
                ref.current.style.height = '39px'
            }
            else {
                ref.current.style.height = `${ref.current.scrollHeight - 20}px`;
                // console.log('else = ', ref.current.scrollHeight, rows)
            }
        }
    }, [rows])

    // init начальную высоту areatext
    useEffect(() => {
        ref.current.style.height = '39px'
    }, [])

    return (
        <div className={style.container}>
            <textarea
                className={styleArea.join(' ')}
                type="text"
                autoComplete='off'
                autoFocus={autofocus || false}
                placeholder={placeholder}
                name={name}
                onChange={handler}
                value={value}
                ref={ref}
                onFocus={focusHandler}
                onBlur={blurHandler}
            />
            {iHandler && focus &&
                <HandySvg
                    className={style.iconEnd}
                    src={iHandler}
                    onClick={btnHandler}
                />}
        </div>
    )
}