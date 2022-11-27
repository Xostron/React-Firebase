import React from "react";
import style from './InputDate.module.less'
import { HandySvg } from "handy-svg";

export const InputDate = ({ props }) => {
    const {
        icon,
        placeholder,
    } = props
    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                {icon ?
                    <HandySvg className={style.icon} src={icon} />
                    :
                    null
                }
                <span className={style.name}>{placeholder}...</span>
                <span className={style.name}>{placeholder}:</span>
                <input id="datetime" type="datetime-local" />
            </div>
        </div>
    )
}