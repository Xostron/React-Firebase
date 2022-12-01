import React from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import iBack from '../source/icons/bx-x.svg'
import iDel from '../source/icons/bx-trash-alt.svg'
import { DetailTaskItem } from "../components/detail-task/DetailTaskItem.jsx"
import { useEffect, useState, useContext } from "react"
import { collection, addDoc, getDocs, serverTimestamp, orderBy, getDoc, where, query, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { firebaseContext } from ".."

export const DetailTaskPage = () => {
    const { state } = useLocation()
    const { id } = useParams()
    const history = useNavigate()

    const { db } = useContext(firebaseContext)
    const [task, setTask] = useState()
    const [todos, setTodos] = useState([])
    console.log('task = ', task)


    useEffect(() => {
        getTask()
        getTodo()
    }, [])

    // ****************************API firebase*****************************
    // прочитать задачу
    const getTask = async () => {
        const docRef = doc(db, "tasks", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setTask(docSnap.data())
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
    }
    // удалить задачу
    const deleteTask = async (idx) => {
        console.log('delete task id = ', idx)
        //delete task api
        await deleteDoc(doc(db, "tasks", id))
        history('/tasks')
    }
    // обновить задачу
    const updTask = async () => {
        console.log('upd = ', id)
        const DocRef = doc(db, "tasks", id)
        await updateDoc(DocRef, {
            "title": task.title,
            "info": task.info,
            "dateBegin": task.dateBegin,
            "dateFinish": task.dateFinish,
            "checked": task.checked,
            "createAT": serverTimestamp()
        })
    }
    // обновить завершение задачи
    const updCheck = async (checked) => {
        const DocRef = doc(db, "tasks", id)
        await updateDoc(DocRef, {
            "checked": checked,
            "createAT": serverTimestamp()
        })
    }

    // создать Todo
    const saveTodo = async (idx) => {
        console.log('save Todo = ', todos[idx])
        try {
            const docRef = await addDoc(collection(db, "todos"), {
                idTask: id,
                info: todos[idx].info,
                checked: false,
                createAT: serverTimestamp()
            });
            console.log("Document written with ID: ", docRef.id);
            // присваиваем id 
            // setTasks(tasks.map((val, index) => index === idx ? { ...val, id: docRef.id } : val))
            setTodos(todos.map((todo, index) => index === idx ? { ...todo, id: docRef.id } : todo))
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    // прочитать Todo
    const getTodo = async () => {
        const q = query(collection(db, "todos"), where('idTask', '==', id))
        console.log('AOAOAOAOAOAOA ====== ', q)
        const querySnapshot = await getDocs(q)
        // const q = query(collection(db, "cities"), where("capital", "==", true)); orderBy("createAT", "desc"),, where("idTask", "==", id)
        let arr = []
        console.log('query', q)
        querySnapshot.forEach((doc) => {
            let data = { ...doc.data(), id: doc.id }
            arr.push(data)
        })
        setTodos([...arr])
    }
    // удалить Todo
    const delTodo = async (idx) => {
        console.log('delete api = ', idx)
        let arr = todos
        if (todos[idx].id) {
            await deleteDoc(doc(db, "todos", todos[idx].id));

            arr.splice(idx, 1)
            setTodos([...arr])
        }
        else {
            arr.splice(idx, 1)
            setTodos([...arr])
        }
    }
    // обновить Todo
    const updTodo = async (idx) => {
        console.log('updTodo = ', todos[idx])
        const DocRef = doc(db, "todos", todos[idx].id);
        await updateDoc(DocRef, {
            "idTask": id,
            "info": todos[idx].info,
            "checked": todos[idx].checked,
            "createAT": serverTimestamp()
        });
    }
    const saveOrUpdTodo = async (idx) => {
        console.log('saveOrUpdTodo', idx, todos[idx].id)
        if (todos[idx].id === '') {
            saveTodo(idx)
        }
        else {
            updTodo(idx)
        }
    }
    const saveAndGet = async (idx, e) => {
        // save
        try {
            const docRef = await addDoc(collection(db, "todos"), {
                idTask: id,
                info: e.target.value,
                checked: false,
                createAT: serverTimestamp()
            });
            console.log("Document written with ID: ", docRef.id);
            // присваиваем id 
            // setTasks(tasks.map((val, index) => index === idx ? { ...val, id: docRef.id } : val))
            setTodos(todos.map((todo, index) => index === idx ? { ...todo, id: docRef.id } : todo))
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        getTodo()
        e.target.value = ''
    }
    // обновить завершение задачи
    const updCheckedTodos = async (checked, id) => {
        const DocRef = doc(db, "todos", id)
        await updateDoc(DocRef, {
            "checked": checked,
            // "createAT": serverTimestamp()
        })
    }
    // ******************************HANDLERS*******************************
    // tasks
    const changeHandler = (e) => {
        console.log('changeHandler = ', e.target.name)
        setTask({ ...task, [e.target.name]: e.target.value })
    }
    const changeBoolHandler = (name, bool) => {
        console.log('changeHandler = ', name)
        setTask({ ...task, [name]: !bool })
    }
    // todos
    const addTodoTask = () => {
        console.log('add task', id)
        const item = {
            idTask: id,
            id: '',
            info: '',
            checked: false,
        }
        setTodos(() => {
            let arr = Object.values(todos)
            arr.unshift(item)
            console.log('TODO = ', arr)
            return (arr)
        })
    }
    const changeTodosChecked = (name, bool, idx, id) => {
        console.log('checked todos', idx, bool, name, id, todos)
        setTodos(todos.map((todo, id) => id === idx ? { ...todo, [name]: !bool } : todo))
    }
    const changeHandlerTodos = (e, idx) => {
        console.log('changeHandlerTodos = ', idx, e.target.name, e.target.value)
        setTodos(todos.map((todo, id) => id === idx ? { ...todo, [e.target.name]: e.target.value } : todo))
    }

    // ********************************PROPS********************************
    const item = () => ({
        task: task,

        propsTitle: {
            handler: () => { history('/tasks') },
            propsTextarea: {
                value: task.title,
                changeHandler: changeHandler,
                btnHandler: deleteTask,
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
            checked: task.checked,
            handler: changeBoolHandler,
            updChecked: updCheck
        },
        propsTitleTodos: {
            handler: addTodoTask
        },
        propsTodosItem: {
            todos: todos,
            checkboxHandler: changeTodosChecked,
            updChecked: updCheckedTodos,
            changeHandler: changeHandlerTodos,
            btnHandler: delTodo,
            blurHandler: saveOrUpdTodo
        },
        propsAddTodo: {
            changeHandler: changeHandlerTodos,
            blurHandler: saveAndGet
        }
    })

    return (
        <div style={{ height: 'auto' }}>
            {task ?
                <DetailTaskItem item={item()} />
                :
                <>...Loading</>
            }

        </div>
    )
}