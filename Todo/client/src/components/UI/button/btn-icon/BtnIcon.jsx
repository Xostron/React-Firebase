import React from "react";
import style from './BtnIcon.module.less'
import { HandySvg } from 'handy-svg'

export const BtnIcon = ({ icon, handler }) => {
    return (
        <div className={style.container} onClick={handler}>
            <HandySvg className={style.icon} src={icon} />
        </div>
    )
}