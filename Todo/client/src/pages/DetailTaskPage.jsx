import React from "react"
import { useLocation, useParams } from "react-router-dom"

export const DetailTaskPage = () => {
    const { state } = useLocation()
    const { id } = useParams()
    console.log('state = ', state)
    return (
        <div>
            Task {id}
            TaskList {state.id}
            Title: {state.title}
        </div>
    )
}