import React from 'react'
import { HandySvg } from 'handy-svg'
import style from './Title.module.less'


export const Title = ({ children, props }) => {
    const {
        icon1,
        handler1,
        title,
        text
    } = props
    return (
        <div className={style.title}>
            <div className={style.left}>
                {
                    icon1 ? <div className={style.btn} onClick={handler1}>
                        <HandySvg
                            src={icon1}
                            className={style.icon}
                        />
                    </div> :
                        null
                }

                <div>
                    <strong>{title}</strong>
                    <span className={style.text_span}>{text}</span>
                </div>

            </div>



            <div className={style.right}>
                {children}
            </div>
        </div>
    )
}