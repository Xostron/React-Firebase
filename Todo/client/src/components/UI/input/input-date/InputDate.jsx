import React from "react";
import style from './InputDate.module.less'
import { HandySvg } from "handy-svg";


export const InputDate = ({ props }) => {
    const {
        icon,
        name,
        placeholder,
        value,
        changeHandler,
        blurHandler,
        checked
    } = props
    const styleIcon = [style.icon]
    if (checked) {
        styleIcon.push(style.checked)
    }
    return (
        <div className={style.container}>

            {icon ?
                <HandySvg className={styleIcon.join(' ')} src={icon} />
                :
                null
            }
            {value ?
                <span className={style.name}>{placeholder}:</span>
                :
                <span className={style.name}>{placeholder}...</span>


            }

            <input
                name={name}
                value={value}
                className={style.datetime}
                type="datetime-local"
                onChange={(e) => changeHandler(e)}
                onBlur={(e) => {
                    blurHandler()
                }}
            />


        </div>
    )
}