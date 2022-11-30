import React from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import iBack from '../source/icons/bx-x.svg'
import iDel from '../source/icons/bx-trash-alt.svg'
import { DetailTaskItem } from "../components/detail-task/DetailTaskItem.jsx"
import { useEffect, useState, useContext } from "react"
import { collection, addDoc, getDocs, serverTimestamp, orderBy, query, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { firebaseContext } from ".."

export const DetailTaskPage = () => {
    const { state } = useLocation()
    const { id } = useParams()
    const history = useNavigate()

    const { db } = useContext(firebaseContext)
    const [task, setTask] = useState(state)
    console.log('task = ', task, id)
    const readTask = () => {
        // запрос в БД
    }

    useEffect(() => {
        setTask(state)
    }, [])

    // ****************************API firebase*****************************
    // удалить задачу
    const deleteHandlerTask = async (idx) => {
        console.log('delete task id = ', idx)
        //delete task api
        await deleteDoc(doc(db, "tasks", state.id))
        history('/tasks')
    }
    const updTask = async (idx) => {
        console.log('upd = ', task.id)
        const DocRef = doc(db, "tasks", state.id)
        await updateDoc(DocRef, {
            "title": task.title,
            "info": task.info,
            "dateBegin": task.dateBegin,
            "dateFinish": task.dateFinish,
            "createAT": serverTimestamp()
        })
    }
    // ******************************HANDLERS*******************************
    const changeHandler = (e) => {
        console.log('changeHandler = ', e.target.name)
        setTask({ ...task, [e.target.name]: e.target.value })
    }
    const addTask = () => {
        console.log('add task')
    }

    // ********************************PROPS********************************
    const item = () => ({
        task: task,
        propsTitle: {
            handler: () => { history('/tasks') },
            propsTextarea: {
                value: task.title,
                changeHandler: changeHandler,
                btnHandler: deleteHandlerTask,
                blurHandlerTextarea: updTask
            }
        },
        propsInfo: {
            value: task.info,
            changeHandler: changeHandler,
            blurHandlerTextarea: updTask
        },
        propsDateBegin: {
            value: task.dateBegin,
            changeHandler: changeHandler,
            blurHandler: updTask
        },
        propsDateFinish: {
            value: task.dateFinish,
            changeHandler: changeHandler,
            blurHandler: updTask
        },
        propsFinishCheck: {

        },
    })

    return (
        <div style={{ height: 'auto' }}>
            <DetailTaskItem item={item()} />
        </div>
    )
}