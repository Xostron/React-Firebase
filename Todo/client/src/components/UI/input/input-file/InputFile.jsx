import React from "react";
import style from './InputFile.module.less'
import { HandySvg } from "handy-svg";

export const InputFile = ({ props }) => {
    const {
        icon,
        name
    } = props
    return (
        <>

            <div className={style.container}>
                <span>{name}</span>
                {icon ?
                    <HandySvg className={style.icon} src={icon} />
                    :
                    null
                }

            </div>
            <input className={style.hiddenInputFile} type="file" name="" id="" />

        </>
    )
}