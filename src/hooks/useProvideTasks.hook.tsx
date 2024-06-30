// Source used: https://blog.logrocket.com/using-localstorage-react-hooks/
import {useEffect, useState} from "react";
import {Task} from "../types";

const KEY_NAME = 'tasks';

function getTasksFromLocalStorage(): Array<Task> {
    // getting stored value
    const saved = localStorage.getItem(KEY_NAME);
    if (!saved) return [];
    const parsedTasks = JSON.parse(saved);
    console.log(parsedTasks)
    return [...parsedTasks];
}

export const useProvideTasks = () => {
    // This syntax means lazy initialization. It's a way to initialize a value only once, when the component mounts.
    const [tasks, setTasks] = useState<Array<Task>>(() => getTasksFromLocalStorage());

    const deleteTask = (id: string) => {
        console.log('deleteTask', id)
        console.log(tasks)
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }
    const addTask = (newTask: Task) => {
        const newTasks = [...tasks, newTask];
        setTasks(newTasks);
    }

    const updateTask = (id: string, newTask: Task) => {
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                return newTask;
            }
            return task;
        });
        setTasks(newTasks);
    }

    // TODO: Optimize this function. Maybe filtering by using a Map instead of an array (to search with keys). But that implies changing several parts of the code.
    const filterTasksByTitle = (value: string) => {
        const tasksVisible = tasks.map(task => {
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

    useEffect(() => {
        // storing input name
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