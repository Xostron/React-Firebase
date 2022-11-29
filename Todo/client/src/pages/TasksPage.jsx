import React from "react"
import { useNavigate } from 'react-router-dom'
import { TaskItem } from "../components/task/TaskItem"
import { ListCol } from "../components/UI/list/list-column/ListCol"
import iDel from '../source/icons/bx-trash-alt.svg'
import { BtnIcon } from '../components/UI/button/btn-icon/BtnIcon'
import { useEffect } from "react"
import { useState } from "react"
// import icon1 from '../source/icons/'
import iAdd from '../source/icons/bx-plus.svg'
import { Title } from "../components/title/Title"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useContext } from "react"
import { firebaseContext } from ".."

const tasksMock = [
    { id: 1, title: 'task1', date_begin: '25.11.22', date_finish: '29.11.22' },
    { id: 2, title: 'task2', date_begin: '25.11.22', date_finish: '29.11.22' },
    { id: 3, title: 'task3', date_begin: '25.11.22', date_finish: '29.11.22' },
    { id: 4, title: 'task4', date_begin: '25.11.22', date_finish: '29.11.22' },
    { id: 5, title: 'task5', date_begin: '25.11.22', date_finish: '29.11.22' },
    { id: 6, title: 'task6', date_begin: '25.11.22', date_finish: '29.11.22' },
    { id: 7, title: 'task7', date_begin: '25.11.22', date_finish: '29.11.22' },
    { id: 8, title: 'task8', date_begin: '25.11.22', date_finish: '29.11.22' },
    { id: 9, title: 'task9', date_begin: '25.11.22', date_finish: '29.11.22' },
    { id: 10, title: 'task10', date_begin: '25.11.22', date_finish: '29.11.22' },
    { id: 11, title: 'task11', date_begin: '25.11.22', date_finish: '29.11.22' },
    { id: 12, title: 'task12', date_begin: '25.11.22', date_finish: '29.11.22' },
    { id: 13, title: 'task13', date_begin: '25.11.22', date_finish: '29.11.22' },
    { id: 14, title: 'task14', date_begin: '25.11.22', date_finish: '29.11.22' },
    { id: 15, title: 'task15', date_begin: '25.11.22', date_finish: '29.11.22' },
]



export const TasksPage = () => {
    const history = useNavigate()

    const { auth } = useContext(firebaseContext)
    const [user, loading, error] = useAuthState(auth)
    //данные из БД
    const [tasks, setTasks] = useState(tasksMock)
    // модифицированные tasks
    const [propsTasks, setPropsTasks] = useState([])

    // ****************************API firebase*****************************
    const getTasks = async () => {

    }

    const saveTask = async () => {

    }
    // ******************************HANDLERS*******************************
    const openTaskHandler = (idObj) => {
        let task = tasks.filter((val, id) => id === idObj)[0]
        console.log('task = ', task)
        history(`/tasks/${idObj}`, { state: task })
    }
    const addTaskHandler = () => {
        const item = {
            id: null,
            title: '',
            info: '',
            date_begin: '',
            date_finish: ''
        }
        setTasks(() => {
            let arr = Object.values(tasks)
            arr.unshift(item)
            console.log('DICT = ', arr)
            return (arr)
        })
    }
    const changeHandler = (e, idList) => {
        setTasks(tasks.map((val, idx) =>
            idx === idList ? { ...val, title: e.target.value } : val
        ))
        // console.log('changeHandlerTitle =', idList, e.target.value)
    }
    // ********************************PROPS********************************
    const titleProps = {
        icon1: null,
        handler1: () => { },
        title: 'Мои задачи',
        text: ''
    }
    // функция, которая возвращает массив кнопок для одной задачи objNameTask
    const fooArrBtns = (nameTask) => {
        return ([
            {
                icon: iDel,
                handler: (e) => {
                    console.log('del ', nameTask, e)
                    e.stopPropagation()
                }
            },])
    }
    // callback для map: модифицируем массив с данными в массив props ListCol
    const callbackPropsTasks = (task, idx) => {
        return ({
            idx,
            task,
            handlerOpen: openTaskHandler,
            changeHandlerTitle: changeHandler,
            tools: fooArrBtns(task.title),
        })
    }
    // callback map для children TaskItem
    const callbackRenderChildren = (btn, idx) => {
        return (
            <BtnIcon key={idx} icon={btn.icon} handler={btn.handler} />
        )
    }

    // *******************************EFFECT*******************************
    // обновление пропсов для LictCol
    useEffect(() => {
        setPropsTasks(tasks.map(callbackPropsTasks))
    }, [tasks])

    // API запрос данных при загрузке страницы
    useEffect(() => {

    }, [])

    // *******************************DEBUG*******************************
    // console.log('propsTasks = ', propsTasks)
    return (
        <div>

            <Title props={titleProps}>
                <BtnIcon icon={iAdd} handler={addTaskHandler} />
            </Title>

            <ListCol
                item={propsTasks}
                renderItem={(task, idx) => {
                    return (
                        <TaskItem key={idx} item={task}>
                            {task.tools.map(callbackRenderChildren)}
                        </TaskItem>
                    )
                }}
            />

        </div>
    )
}