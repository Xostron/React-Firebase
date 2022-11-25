import React from "react"
import { TaskItem } from "../components/task/TaskItem"
import { ListCol } from "../components/UI/list/list-column/ListCol"
import iDel from '../source/icons/bx-trash-alt.svg'
import { BtnIcon } from '../components/UI/button/btn-icon/BtnIcon'


const tasksMock = [
    { id: 1, title: 'task1', date_create: '25.11.22', date_finish: '29.11.22' },
    { id: 2, title: 'task2', date_create: '25.11.22', date_finish: '29.11.22' },
    { id: 3, title: 'task3', date_create: '25.11.22', date_finish: '29.11.22' },
    { id: 4, title: 'task4', date_create: '25.11.22', date_finish: '29.11.22' },
    { id: 5, title: 'task5', date_create: '25.11.22', date_finish: '29.11.22' },
    { id: 6, title: 'task6', date_create: '25.11.22', date_finish: '29.11.22' },
    { id: 7, title: 'task7', date_create: '25.11.22', date_finish: '29.11.22' },
    { id: 8, title: 'task8', date_create: '25.11.22', date_finish: '29.11.22' },
    { id: 9, title: 'task9', date_create: '25.11.22', date_finish: '29.11.22' },
    { id: 10, title: 'task10', date_create: '25.11.22', date_finish: '29.11.22' },
    { id: 11, title: 'task11', date_create: '25.11.22', date_finish: '29.11.22' },
    { id: 12, title: 'task12', date_create: '25.11.22', date_finish: '29.11.22' },
    { id: 13, title: 'task13', date_create: '25.11.22', date_finish: '29.11.22' },
    { id: 14, title: 'task14', date_create: '25.11.22', date_finish: '29.11.22' },
    { id: 15, title: 'task15', date_create: '25.11.22', date_finish: '29.11.22' },
]

export const TasksPage = () => {

    // ********************************PROPS********************************
    // функция, которая возвращает массив кнопок для одной задачи objNameTask
    const fooArrBtns = (nameTask) => {
        return ([
            {
                icon: iDel,
                handler: (e) => {
                    console.log('del ', nameTask)
                    e.stopPropagation()
                }
            },])
    }

    // callback для map: модифицируем массив с данными в массив props компонетов
    const callbackArrItems = (item, idx) => {
        return ({
            id: item.id || idx,
            title: item.title,
            date_create: item.date_create,
            date_finish: item.date_finish,
            handlerOpen: () => { console.log('open ', item.title) },
            tools: fooArrBtns(item.title),
        })
    }
    const tasks = tasksMock.map(callbackArrItems)

    // callback map для children TaskItem
    const callbackRenderChildren = (btn, idx) => {
        return (
            <BtnIcon key={idx} icon={btn.icon} handler={btn.handler} />
        )
    }

    // callback map для компонента ListCol
    const callbackRenderTask = (task, idx) => {
        return (
            <TaskItem key={idx} item={task}>
                {task.tools.map(callbackRenderChildren)}
            </TaskItem>)
    }

    return (
        <div>
            <ListCol
                item={tasks}
                renderItem={callbackRenderTask}
            />
        </div>
    )
}