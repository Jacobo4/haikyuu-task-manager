// Source used: https://blog.logrocket.com/using-localstorage-react-hooks/
// Core
import {useEffect, useState} from "react";
import {Task} from "../types";

function getTasksFromLocalStorage(): Array<Task> {
    // getting stored value
    const saved = localStorage.getItem('tasks');
    if (!saved) return [];
    const parsedTasks = JSON.parse(saved);
    return [...parsedTasks];
}

// Update this to use a set instead of an array to improve performance
export const useProvideTasks = () => {
    // This syntax means lazy initialization. It's a way to initialize a value only once, when the component mounts.
    const [tasks, setTasks] = useState<Array<Task>>(() => getTasksFromLocalStorage());

    const deleteTask = (id: string): void => {
        const newTasks = tasks.filter((task:Task) => task.id !== id);
        setTasks(newTasks);
    }
    const addTask = (newTask: Task): void => {
        const newTasks = [...tasks, newTask];
        setTasks(newTasks);
    }
    const updateTask = (id: string, newTask: Task):void => {
        const newTasks = tasks.map((task: Task) => {
            if (task.id === id) {
                return newTask;
            }
            return task;
        });
        setTasks(newTasks);
    }

    // TODO: Optimize this function. Maybe filtering by using a Map instead of an array (to search with keys). But that implies changing several parts of the code.
    const filterTasksByTitle = (value: string) => {
        const tasksVisible = tasks.map((task: Task) => {
            const isVisible = task.title.toLowerCase().includes(value.toLowerCase());
            if (value === '') {
                return {
                    ...task,
                    isVisible: true
                }
            }
            return {
                ...task,
                isVisible
            }
        });
        setTasks(tasksVisible);
    }

    // On any change on the tasks arrays, it will update the local storage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return {
        tasks,
        addTask,
        deleteTask,
        updateTask,
        filterTasksByTitle
    };
};