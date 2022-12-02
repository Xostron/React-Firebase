import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { TaskItem } from "../components/task/TaskItem"
import { ListCol } from "../components/UI/list/list-column/ListCol"
import { BtnIcon } from '../components/UI/button/btn-icon/BtnIcon'
import { Title } from "../components/title/Title"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useContext } from "react"
import { firebaseContext } from ".."
import iDel from '../source/icons/bx-trash-alt.svg'
import iAdd from '../source/icons/bx-plus.svg'
import { collection, addDoc, getDocs, serverTimestamp, orderBy, query, updateDoc, doc, deleteDoc } from "firebase/firestore";




export const TasksPage = () => {
    const history = useNavigate()
    const { auth, db } = useContext(firebaseContext)
    const [user, loading, error] = useAuthState(auth)
    //данные из БД
    const [tasks, setTasks] = useState([])
    // модифицированные tasks
    const [propsTasks, setPropsTasks] = useState([])


    // ****************************API firebase*****************************
    // удалить задачу
    const delTask = async (idx) => {
        console.log('delete api = ', idx)
        let arr = tasks
        if (tasks[idx].id) {
            await deleteDoc(doc(db, "tasks", tasks[idx].id));

            arr.splice(idx, 1)
            setTasks([...arr])
        }
        else {
            arr.splice(idx, 1)
            setTasks([...arr])
        }

    }
    // обновить задачу
    const updTask = async (idx) => {
        // let updData = tasks[idx]
        console.log('upd = ', tasks[idx])
        const DocRef = doc(db, "tasks", tasks[idx].id);
        await updateDoc(DocRef, {
            "title": tasks[idx].title,
            "info": tasks[idx].info,
            "dateBegin": tasks[idx].dateBegin,
            "dateFinish": tasks[idx].dateFinish,
            "createAT": serverTimestamp()
        });
    }
    // прочитать все задачи
    const getTasks = async () => {
        const q = query(collection(db, "tasks"), orderBy("createAT", "desc"))
        const querySnapshot = await getDocs(q)
        // const q = query(collection(db, "cities"), where("capital", "==", true));

        console.log('query', q)
        querySnapshot.forEach((doc) => {
            let data = { ...doc.data(), id: doc.id }
            setTasks((prev) => [...prev, data])
        })

    }
    // создать одну задачу
    const saveTask = async (idx) => {
        console.log('saveTask = ', tasks[idx])
        try {
            const docRef = await addDoc(collection(db, "tasks"), {
                uid: tasks[idx].uid,
                title: tasks[idx].title,
                info: tasks[idx].info,
                dateBegin: tasks[idx].dateBegin,
                dateFinish: tasks[idx].dateFinish,
                checked: tasks[idx].checked,
                createAT: serverTimestamp()
            });
            console.log("Document written with ID: ", docRef.id);
            // присваиваем id задаче для последующих операци обновления
            setTasks(tasks.map((val, index) => index === idx ? { ...val, id: docRef.id } : val))
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        // console.log('save = ', saveId)

    }

    const saveOrUpdTask = async (idx) => {
        console.log('saveOrUpd = ', tasks[idx].id, tasks[idx])
        if (tasks[idx].id === '') {
            saveTask(idx)
        }
        else {
            updTask(idx)
        }
    }
    // ******************************HANDLERS*******************************
    const openTaskHandler = (idObj) => {
        let task = tasks.filter((val, id) => id === idObj)[0]
        history(`/tasks/${task.id}`, { state: task })
    }
    const addTaskHandler = () => {
        const item = {
            id: '',
            uid: user.uid,
            title: '',
            info: '',
            dateBegin: '',
            dateFinish: '',
            checked: false
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
    const fooArrBtns = (idx) => {
        return ([
            {
                icon: iDel,
                handler: (e) => {
                    delTask(idx)
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
            saveHandler: saveOrUpdTask,

            tools: fooArrBtns(idx),
        })
    }
    // callback map для children TaskItem
    const callbackRenderChildren = (btn, idx) => {
        return (
            <BtnIcon key={idx} icon={btn.icon} handler={btn.handler} />
        )
    }

    // *******************************EFFECT*******************************
    // обновление пропсов для ListCol
    useEffect(() => {
        tasks && setPropsTasks(tasks.map(callbackPropsTasks))
        // console.log('tasks=', tasks)
    }, [tasks])

    // API запрос данных при загрузке страницы
    useEffect(() => {
        getTasks()
    }, [])

    // ******************************SHEDULER******************************
    const [shedulerTasks, setShedularTasks] = useState([])
    const [current, setCurrent] = useState()

    const callbackSheduler = () => {
        console.log('current time=', new Date())
        // setCurrent(prev => new Date)
        // console.log('TIME = ', current)
    }
    useEffect(() => {
        let id = setInterval(callbackSheduler, 1000)
        return () => clearInterval(id)
    }, [])

    // *******************************DEBUG*******************************
    // console.log('propsTasks = ', propsTasks)
    return (
        <div>

            <Title props={titleProps}>
                <BtnIcon icon={iAdd} handler={addTaskHandler} />
            </Title>
            {tasks &&
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
            }
        </div>
    )
}



// const tasksMock = [
//     { id: 1, title: 'task1', date_begin: '25.11.22', date_finish: '29.11.22' },
//     { id: 2, title: 'task2', date_begin: '25.11.22', date_finish: '29.11.22' },
//     { id: 3, title: 'task3', date_begin: '25.11.22', date_finish: '29.11.22' },
//     { id: 4, title: 'task4', date_begin: '25.11.22', date_finish: '29.11.22' },
//     { id: 5, title: 'task5', date_begin: '25.11.22', date_finish: '29.11.22' },
//     { id: 6, title: 'task6', date_begin: '25.11.22', date_finish: '29.11.22' },
//     { id: 7, title: 'task7', date_begin: '25.11.22', date_finish: '29.11.22' },
//     { id: 8, title: 'task8', date_begin: '25.11.22', date_finish: '29.11.22' },
//     { id: 9, title: 'task9', date_begin: '25.11.22', date_finish: '29.11.22' },
//     { id: 10, title: 'task10', date_begin: '25.11.22', date_finish: '29.11.22' },
//     { id: 11, title: 'task11', date_begin: '25.11.22', date_finish: '29.11.22' },
//     { id: 12, title: 'task12', date_begin: '25.11.22', date_finish: '29.11.22' },
//     { id: 13, title: 'task13', date_begin: '25.11.22', date_finish: '29.11.22' },
//     { id: 14, title: 'task14', date_begin: '25.11.22', date_finish: '29.11.22' },
//     { id: 15, title: 'task15', date_begin: '25.11.22', date_finish: '29.11.22' },
// ]