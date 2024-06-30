import {Status, Task} from "../../types.d.ts";
import {EditText, EditTextarea} from 'react-edit-text';
import styles from './TaskCard.component.module.css';
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/react'
import {useEffect, useReducer} from "react";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {IoTrashOutline} from "react-icons/io5";
import {useTasks} from "../../App.tsx";
import {motion} from "framer-motion";


const statuses: { status: Status, label: string, className: string }[] = [
    {
        status: Status.Pending,
        label: "Pending",
        className: "status--pending"

    },
    {
        status: Status.InProgress,
        label: "In progress",
        className: "status--inprogress"
    },
    {
        status: Status.Completed,
        label: "Completed",
        className: "status--completed"
    },
];

function reducer(state: Task, action) {
    switch (action.type) {
        case 'change_title': {
            return {
                ...state,
                title: action.nextTitle,
            };
        }
        case 'change_description': {
            return {
                ...state,
                description: action.nextDescription,
            };
        }
        case 'change_status': {
            return {
                ...state,
                status: action.nextStatus,
            };
        }
    }
    throw Error('Unknown action: ' + action.type);
}

interface TaskCardIProps {
    initialValues: Task;
}

function TaskCard({initialValues}: TaskCardIProps) {
    const {updateTask, deleteTask} = useTasks();
    const [taskState, dispatch] = useReducer(reducer, {...initialValues});
    const defaultStatus = statuses.find((stat) => stat.status === taskState.status);

    useEffect(() => {
        updateTask(taskState.id, taskState);
    }, [taskState]);

    const deleteT = () => {
        deleteTask(taskState.id);
    }
    return (
        initialValues.isVisible && (
            <motion.div
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.1}}
                className={styles['TaskCard']}
            >
                <EditText
                    name="title"
                    defaultValue={taskState.title}
                    inputClassName='bg-success'
                    onSave={(e) => dispatch({type: "change_title", nextTitle: e.value})}
                />
                <EditTextarea
                    name="description"
                    defaultValue={taskState.description}
                    rows={5}
                    onSave={(e) => dispatch({type: "change_description", nextDescription: e.value})}
                />
                <div className={styles['actions-wrapper']}>
                    <Listbox value={defaultStatus.status}
                             onChange={(value) => dispatch({type: 'change_status', nextStatus: value})}>

                        <ListboxButton className={`${styles['dropdown-trigger']} ${styles[defaultStatus.className]}`}>
                            {defaultStatus.label}
                            <MdOutlineKeyboardArrowDown/>
                        </ListboxButton>

                        <ListboxOptions anchor="bottom" className={styles['dropdown-list']}>
                            {statuses.map((stat: Status, index) => (
                                <ListboxOption key={index} value={stat.status} className={styles[stat.className]}>
                                    {stat.label}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>

                    </Listbox>
                    <button className={styles['trash-button']} onClick={() => deleteT()}>
                        <IoTrashOutline/>
                    </button>
                </div>
            </motion.div>)
    );


}

export default TaskCard;