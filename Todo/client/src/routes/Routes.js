import { Navigate } from "react-router";
import { AboutPage } from "../pages/AboutPage";
import { DetailTaskPage } from "../pages/DetailTaskPage";
import { LoginPage } from "../pages/LoginPages";
import { TasksPage } from "../pages/TasksPage";

export const MyRoutes = [
    { path: '/tasks', element: <TasksPage /> },
    { path: '/tasks/:id', element: <DetailTaskPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/about', element: <AboutPage /> },
    { path: '*', element: <Navigate replace to='/login' /> }
]

