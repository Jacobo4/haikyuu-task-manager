// Core
import {ReducerState, useEffect, useReducer} from "react";
import {Status, Task} from "@root/types.d.ts";
// Hooks
import {useTasks} from "@root/App.tsx";
// Components
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/react'
import {EditText, EditTextarea} from "react-edit-text";
// Styles
import {motion} from "framer-motion";
// Styles
import styles from './TaskCard.component.module.css';
// Icons
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {IoTrashOutline} from "react-icons/io5";


// possible statuses
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

// Reducer function to manage the state of the task. Basically to update the task whatever the user changes
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
    const [taskState, dispatch] = useReducer<ReducerState<Task>, any>(reducer, {...initialValues});
    // Look for the default status of the task
    const defaultStatus = statuses.find((stat) => stat.status === taskState.status);
    const {updateTask, deleteTask} = useTasks();

    // Whenever the taskState changes, update the task
    useEffect(() => {
        updateTask(taskState.id, taskState);
    }, [taskState]);

    // Delete the task. Not used the name delete because it's a reserved word
    const deleteT = (): void => {
        deleteTask(taskState.id);
    }
    return (
        // If the task is visible, show the task card. It's to used with conjunction with the search bar
        initialValues.isVisible && (
            <motion.div
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.1}}
                className={styles['TaskCard']}
            >
                {/* --- title input starts ---*/}
                <EditText
                    name="title"
                    defaultValue={taskState.title}
                    inputClassName='bg-success'
                    onSave={(e) => dispatch({type: "change_title", nextTitle: e.value})}
                />
                {/* --- title input ends ---*/}

                {/* --- description input starts ---*/}
                <EditTextarea
                    name="description"
                    defaultValue={taskState.description}
                    rows={5}
                    onSave={(e) => dispatch({type: "change_description", nextDescription: e.value})}
                />
                {/* --- description input ends ---*/}

                {/* --- status dropdown starts ---*/}
                <div className={styles['actions-wrapper']}>
                    {/* -- dropdown starts -- */}
                    <Listbox value={defaultStatus.status} onChange={(value:string) => dispatch({type: 'change_status', nextStatus: value})}>
                        <ListboxButton className={`${styles['dropdown-trigger']} ${styles[defaultStatus.className]}`}>
                            {defaultStatus.label}
                            <MdOutlineKeyboardArrowDown/>
                        </ListboxButton>

                        <ListboxOptions anchor="bottom" className={styles['dropdown-list']}>
                            {statuses.map((stat , index: number) => (
                                <ListboxOption key={index} value={stat.status} className={styles[stat.className]}>
                                    {stat.label}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Listbox>
                    {/* -- dropdown ends -- */}

                    {/* -- delete button starts -- */}
                    <button className={styles['trash-button']} onClick={() => deleteT()}>
                        <IoTrashOutline/>
                    </button>
                    {/* -- delete button ends -- */}

                </div>
                {/* --- status dropdown ends ---*/}
            </motion.div>)
    );


}

export default TaskCard;