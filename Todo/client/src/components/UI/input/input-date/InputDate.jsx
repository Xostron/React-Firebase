import React from "react";
import style from './InputDate.module.less'
import { HandySvg } from "handy-svg";


export const InputDate = ({ props }) => {
    const {
        icon,
        placeholder,
        value,
        handler
    } = props

    return (
        <div className={style.container}>

            {icon ?
                <HandySvg className={style.icon} src={icon} />
                :
                null
            }
            {value ?
                <span className={style.name}>{placeholder}:</span>
                :
                <span className={style.name}>{placeholder}...</span>


            }

            <input
                className={style.datetime}
                type="datetime-local"
                onChange={handler}

            />


        </div>
    )
}