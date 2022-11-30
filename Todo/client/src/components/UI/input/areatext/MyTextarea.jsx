import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import style from './MyTextarea.module.less'
import { HandySvg } from 'handy-svg'


export const MyTextarea = ({ props }) => {
    const styleArea = [style.myTextarea]
    const {
        idx,
        name,
        placeholder,
        changeHandler,
        value,
        autofocus,
        checked,
        type,
        iHandler,
        btnHandler,
        blurHandlerTextarea
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
        blurHandlerTextarea(idx)
        e.stopPropagation()
    }

    // autosize - авторастягивание при заполнении/обратно
    const ref = useRef()
    // const [rows, setRows] = useState(0)
    const autosize = () => {
        let str = ref.current.style.height.match(/[0-9]/g) || []
        let val = Number(str.join(''))

        if (ref.current.value === '') {
            ref.current.style.height = '38px'
        }
        else if (ref.current.scrollHeight > val) {
            ref.current.style.height = `${ref.current.scrollHeight}px`
        }
        else if (ref.current.scrollHeight < val) {
            ref.current.style.height = `${ref.current.scrollHeight - 20}px`;
        }
        // console.log('testarea= ', ref.current.scrollHeight, ref.current.style.height)
    }

    // onChange - событие для обработки текста
    const handler = (e) => {
        // props handler
        changeHandler(e, idx)
        // высота содержимого areatext
        // setRows(ref.current.scrollHeight)
        autosize(e)
    }

    // autosize
    // useLayoutEffect(() => {
    //     let str = ref.current.style.height.match(/[0-9]/g) || []
    //     let val = Number(str.join(''))

    //     if (ref.current.value === '') {
    //         ref.current.style.height = '38px'
    //         setRows(ref.current.scrollHeight)
    //     }
    //     else if (rows > val) {
    //         ref.current.style.height = `${rows}px`
    //     }
    //     else if (rows < val) {
    //         ref.current.style.height = `${rows - 20}px`;
    //     }
    //     console.log('testarea= ', ref.current.scrollHeight, ref.current.style.height, rows)
    // }, [rows])

    // init начальную высоту areatext
    useEffect(() => {
        autosize()
        if (ref.current.scrollHeight === 59) { ref.current.style.height = '39px' }
        // ref.current.style.height = '39px'
        // ref.current.style.height = `${ref.current.scrollHeight}px`
        // console.log('test = ', ref.current.style.height, ref.current.scrollHeight)
    }, [])

    // 
    return (
        <div className={style.container} onClick={(e) => { e.stopPropagation() }}>
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
                    onClick={() => btnHandler(idx)}
                />}
        </div>
    )
}