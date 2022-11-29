import React from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import iBack from '../source/icons/bx-x.svg'
import iDel from '../source/icons/bx-trash-alt.svg'
import { DetailTaskItem } from "../components/detail-task/DetailTaskItem.jsx"
import { useEffect, useState } from "react"


export const DetailTaskPage = () => {
    const { state } = useLocation()
    const { id } = useParams()
    const history = useNavigate()
    console.log('state = ', state)

    const [task, setTask] = useState(null)

    const readTask = () => {
        // запрос в БД
    }

    useEffect(() => {
        setTask(state)
    }, [])

    // 
    const deleteHandlerTask = (id) => {
        console.log('delete task id = ', id)
        //delete task api
        // history('/tasks')
    }

    const changeHandler = (e) => {
        console.log('changeHandler = ', e.target.name)
        setTask({ ...task, [e.target.name]: e.target.value })
    }
    const addTask = () => {
        console.log('add task')
    }
    // 
    // const item = {
    //     task: task,
    //     propsTitle: {
    //         icon: iBack,
    //         handler: () => { history('/tasks') },
    //         propsTextarea: {
    //             name: 'title',
    //             placeholder: 'Название...',
    //             iHandler: iDel,
    //             btnHandler: deleteTaskHandler,
    //             value: task.title,
    //             changeHandler: changeHandler
    //         }
    //     },
    //     propsInfo: {
    //         name: 'info',
    //         placeholder: '...',
    //         value: task.info,
    //         changeHandler: changeHandler
    //     },
    //     propsFile: {
    //         icon: iFile,
    //         name: 'Файлы:',
    //     },
    //     propsDateBegin: {

    //     },
    //     propsDateFinish: {

    //     },
    //     propsDateCheck: {

    //     },
    //     propsTitleTodo: {
    //         text: 'Список задач:',
    //         children: {
    //             icon: iAdd,
    //             handler: addTask,
    //         }
    //     },
    //     propsTodos:{
    //         propsCheck:{
    //             changeCheckedHandler:()=>{}
    //             checked:task
    //         }
    //     },
    //     propsAreatextOneTodo:{

    //     }
    // }

    return (
        <div style={{ height: 'auto' }}>
            <DetailTaskItem item={state} />
        </div>
    )
}