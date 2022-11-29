import React from "react"
import { useLocation, useParams } from "react-router-dom"
import iBack from '../source/icons/bx-x.svg'
import iSave from '../source/icons/bx-check.svg'
import iDel from '../source/icons/bx-trash-alt.svg'
import iFile from '../source/icons/bx-file.svg'
import { DetailTaskItem } from "../components/detail-task/DetailTaskItem.jsx"
import { MyTextarea } from "../components/UI/input/areatext/MyTextarea.jsx"
import { Title } from "../components/title/Title"

export const DetailTaskPage = () => {
    const { state } = useLocation()
    const { id } = useParams()
    // console.log('state = ', state)

    const titleProps = {
        icon1: iBack,
        handler1: () => { },
        title: '',
        text: '',
    }
    const propsTextarea = {
        icon: iDel,
        name: 'todo',
        placeholder: 'Задача...',
        changeHandler: () => { },
        type: false
    }
    const isFocus = false

    return (
        <div style={{ height: 'auto' }}>
            {/* <hr /> */}
            <DetailTaskItem />
        </div>
    )
}