import React from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import iBack from '../source/icons/bx-x.svg'
import iDel from '../source/icons/bx-trash-alt.svg'
import { DetailTaskItem } from "../components/detail-task/DetailTaskItem.jsx"
import { useEffect, useState, useContext } from "react"
import { collection, addDoc, getDocs, serverTimestamp, orderBy, getDoc, where, query, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { firebaseContext } from ".."
import { useSchedular } from "../hooks/useSchedular"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export const DetailTaskPage = () => {
    const { state } = useLocation()
    const { id } = useParams()
    const history = useNavigate()
    const [schedularState, setSchedularState] = useState({ state: 'none' })
    const { db, storage } = useContext(firebaseContext)
    const [task, setTask] = useState()
    const [todos, setTodos] = useState([])
    const [files, setFiles] = useState([])
    // console.log('task = ', task)
    // INIT SHEDULER
    const { currentTime } = useSchedular(callbackSchedular, 1000)

    useEffect(() => {
        getTask()
        getTodo()
        getFiles()
    }, [])

    // useEffect(()=>{},[])
    // ***********************API firestorage - File************************
    const uploadFile = async (e) => {
        console.log('UPLOAD FILE = ', e.target.files[0])
        // создаем папку/имя файла
        const storageRef = ref(storage, `${id}/${e.target.files[0].name}`);
        // загружаем
        uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getFiles()
        });

    }
    const delFile = async (e) => {

    }
    const getFiles = async (e) => {
        const listRef = ref(storage, `${id}`);
        let arr = []
        // Find all the prefixes and items.
        listAll(listRef)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    // All the prefixes under listRef.
                    // console.log("folderRef = ", folderRef)
                    // You may call listAll() recursively on them.
                });
                res.items.forEach((itemRef) => {
                    arr.push(itemRef.name)
                    // setFiles(prev => [...prev, itemRef.name])
                    console.log("itemRef = ", itemRef, arr)
                });
                setFiles([...arr])
            }).catch((error) => {
                // Uh-oh, an error occurred!
            });

    }
    const downloadFile = async (e, idx) => {
        const pathReference = ref(storage, `${id}/${files[idx]}`)

        let url = await getDownloadURL(pathReference)
        console.log(url)

        let response = await fetch(url)
        let blob = await response.blob()
        let file = window.URL.createObjectURL(new Blob([blob]));
        // window.location.assign(file);
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank'
        link.download = true
        // link.setAttribute('download');
        // 3. Append to html page
        document.body.appendChild(link);
        // 4. Force download
        link.click();
        // 5. Clean up and remove the link
        link.parentNode.removeChild(link);
    }
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
        // console.log('delete task id = ', idx)
        //delete task api
        await deleteDoc(doc(db, "tasks", id))
        history('/tasks')
    }
    // обновить задачу
    const updTask = async () => {
        // console.log('upd = ', id)
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
        // console.log('save Todo = ', todos[idx])
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
        const q = query(collection(db, "todos"), where('idTask', '==', id), orderBy("createAT", "desc"))
        // console.log('AOAOAOAOAOAOA ====== ', q)
        const querySnapshot = await getDocs(q)
        // const q = query(collection(db, "cities"), where("capital", "==", true)); orderBy("createAT", "desc"),, where("idTask", "==", id)
        let arr = []
        // console.log('query', q)
        querySnapshot.forEach((doc) => {
            let data = { ...doc.data(), id: doc.id }
            arr.push(data)
        })
        setTodos([...arr])
    }
    // удалить Todo
    const delTodo = async (idx) => {
        // console.log('delete api = ', idx)
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
        // console.log('updTodo = ', todos[idx])
        const DocRef = doc(db, "todos", todos[idx].id);
        await updateDoc(DocRef, {
            "idTask": id,
            "info": todos[idx].info,
            "checked": todos[idx].checked,
            "createAT": serverTimestamp()
        });
    }
    const saveOrUpdTodo = async (idx) => {
        // console.log('saveOrUpdTodo', idx, todos[idx].id)
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
        // console.log('changeHandler = ', e.target.name)
        setTask({ ...task, [e.target.name]: e.target.value })
    }
    const changeBoolHandler = (name, bool) => {
        // console.log('changeHandler = ', name)
        setTask({ ...task, [name]: !bool })
    }
    // todos
    const addTodoTask = () => {
        // console.log('add task', id)
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
        // console.log('checked todos', idx, bool, name, id, todos)
        setTodos(todos.map((todo, id) => id === idx ? { ...todo, [name]: !bool } : todo))
    }
    const changeHandlerTodos = (e, idx) => {
        // console.log('changeHandlerTodos = ', idx, e.target.name, e.target.value)
        setTodos(todos.map((todo, id) => id === idx ? { ...todo, [e.target.name]: e.target.value } : todo))
    }

    // ********************************PROPS********************************
    const item = () => ({
        task: task,
        files: {
            items: files,
            downloadHandler: downloadFile,
            deleteHandler: () => { },
            uploadHandler: uploadFile
        },

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
            blurHandler: updTask,
            schedularState: schedularState
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
        },
        // propsFile: {
        //     handler: changeHandlerFile
        // }
    })
    // ******************************SHEDULER******************************
    function callbackSchedular() {
        // console.log('========', currentTime)
        let state = {}
        if (task.checked) {
            state = {
                state: 'checked'
            }
        }
        else if (Date.parse(task.dateFinish) > currentTime) {
            state = {
                state: 'warning'
            }
        }
        else if (Date.parse(task.dateFinish) <= currentTime) {
            state = {
                state: 'alarm'
            }
        }
        // console.log('STATE = ', state)
        setSchedularState(state)
    }
    // console.log('GET FILE = ', files)
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