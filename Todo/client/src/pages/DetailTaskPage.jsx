import React from "react"
import { useLocation, useParams } from "react-router-dom"
import { Title } from '../components/title/Title.jsx'
import { BtnIcon } from "../components/UI/button/btn-icon/BtnIcon.jsx"
import iBack from '../source/icons/bx-x.svg'
import iSave from '../source/icons/bx-check.svg'
import iDel from '../source/icons/bx-trash-alt.svg'
import iFile from '../source/icons/bx-file.svg'

export const DetailTaskPage = () => {
    const { state } = useLocation()
    const { id } = useParams()
    // console.log('state = ', state)

    const titleProps = {
        icon1: iBack,
        handler1: () => { },
        title: state.title,
        text: ''
    }
    const isFocus = false
    return (
        <div>
            <Title props={titleProps}>
                {
                    isFocus ?
                        <>
                            <BtnIcon icon={iSave} handler={() => { }} />
                        </>
                        :
                        <>
                            <BtnIcon icon={iFile} handler={() => { }} />
                            <BtnIcon icon={iDel} handler={() => { }} />
                        </>
                }
            </Title>
            Task {id}
            TaskList {state.id}
            Title: {state.title}
        </div>
    )
}