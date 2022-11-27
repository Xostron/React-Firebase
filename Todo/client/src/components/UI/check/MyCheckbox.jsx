import React, { useRef, useState } from 'react'
import { HandySvg } from 'handy-svg'
import style from './MyCheckbox.module.less'
import iOk from '../../../source/icons/bx-check.svg'


export const MyCheckbox = ({ props }) => {

    const { handler, checked } = props

    // const [active, setActive] = useState(false)

    const styleToggle = checked ? (style.toggle + ' ' + style.active) : style.toggle
    const styleTContainer = checked ? (style.container + ' ' + style.active) : style.container

    const checkRef = useRef()

    const handlerEvent = () => {
        checkRef.current.click()
        // setActive(!active)
        handler()
        // console.log('check = ', active)
    }
    return (
        <>
            <div className={styleTContainer} onClick={handlerEvent}>
                <HandySvg
                    className={styleToggle}
                    src={iOk}
                />
            </div>

            <input className={style.hiddenParent} type="checkbox" ref={checkRef} />

        </>
    )
}