import React from "react";
import { LinkIcon } from "../UI/link/link-icon/LinkIcon";
import style from './Navbar.module.less'
import iTasks from '../../source/icons/bx-calendar-star.svg'
import iAbout from '../../source/icons/bx-leaf.svg'
import { BtnText } from "../UI/button/btn-text/BtnText";

export const Navbar = () => {
    const links = [
        { name: 'Мои задачи', icon: iTasks, to: '/tasks', type: 'st', disabled: false },
        { name: 'О нас', icon: iTasks, to: '/about', type: 'st', disabled: false }
    ]
    const user = true
    return (
        <div className={style.container}>
            <div className={style.left}>
                <h2>Xostron</h2>
                {links.map(link => <LinkIcon item={link} />)}
            </div>

            <div className={style.right}>
                {user ?
                    <>
                        <BtnText onClick={() => { }}>
                            Выйти
                        </BtnText>
                        <div className={style.online}></div>
                    </>
                    :
                    <>
                        <BtnText onClick={() => { }}>
                            Войти
                        </BtnText>
                        <div className={style.offline}></div>
                    </>
                }


            </div>
        </div>
    )
}