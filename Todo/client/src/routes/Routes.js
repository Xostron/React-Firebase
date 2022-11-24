import { Navigate } from "react-router";
import { DetailTaskPage } from "../pages/DetailTaskPage";
import { LoginPage } from "../pages/LoginPages";
import { TasksPage } from "../pages/TasksPage";

export const MyRoutes = [
    { path: '/tasks', element: <TasksPage /> },
    { path: '/tasks/:id', element: <DetailTaskPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '*', element: <Navigate replace to='/login' /> }
]

