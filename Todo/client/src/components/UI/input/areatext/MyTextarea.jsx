import React from "react";
import style from './MyTextarea.module.less'
import { HandySvg } from 'handy-svg'

export const MyTextarea = ({ props }) => {
    const {
        name,
        placeholder,
        changeHandler,
        value,
        autofocus,
    } = props
    return (
        <div className={style.container}>
            <textarea
                className={style.myTextarea}
                // ref={areaRef}
                type="text"
                autoComplete='off'
                autoFocus={autofocus || false}
                placeholder={placeholder}
                name={name}
                onChange={changeHandler}
                value={value}
            />
        </div>
    )
}