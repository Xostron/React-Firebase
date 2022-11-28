import React from "react";
import style from './MyTextarea.module.less'
import { HandySvg } from 'handy-svg'
import { useRef } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";

export const MyTextarea = ({ props }) => {
    const {
        name,
        placeholder,
        changeHandler,
        value,
        autofocus,
    } = props

    const ref = useRef()
    const [rows, setRows] = useState(0)


    const handler = (e) => {
        changeHandler()
        setRows(ref.current.scrollHeight)
    }

    useEffect(() => {
        let str = ref.current.style.height.match(/[0-9]/g) || []
        let val = Number(str.join(''))
        // console.log('test = ', val, ref.current.scrollHeight)
        if (ref.current.scrollHeight > val) {
            ref.current.style.height = `${ref.current.scrollHeight}px`;
            console.log('if = ', val, rows)
        }
        else if (val === (ref.current.scrollHeight + 1)) {
            if (ref.current.value === '') {
                ref.current.style.height = '39px'
            }
            else {
                ref.current.style.height = `${ref.current.scrollHeight - 20}px`;
                console.log('else = ', ref.current.scrollHeight, rows)
            }
        }
    }, [rows])

    useEffect(() => {
        ref.current.style.height = '39px'
    }, [])

    return (
        <div className={style.container}>
            <textarea
                className={style.myTextarea}
                type="text"
                autoComplete='off'
                autoFocus={autofocus || false}
                placeholder={placeholder}
                name={name}
                onChange={handler}
                value={value}
                ref={ref}
            />
        </div>
    )
}