import {Status, Task} from "../../types";
import {EditText, EditTextarea} from 'react-edit-text';
import styles from './TaskCard.component.module.css';
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/react'
import {useEffect, useState} from "react";

const statuses: string[] = ['Pending', 'InProgress', 'Completed'];
interface TaskCardIProps extends Task {
    cbDelete: (id: string) => void;
}

function TaskCard({id, title, description, status, isVisible, cbDelete}: TaskCardIProps) {
    // NOTE: The logic to delete a task is implemented in the parent component, because hook rules states "Don't call Hooks inside loops" and this component is must to be used inside a loop.
    // TODO: Convert this to a reducer

    const [newStatus, setNewStatus] = useState(statuses[statuses.indexOf(status)]);
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const handleChangeTitle = (value: string) => {
        setNewTitle(value);
    }
    const handleChangeDescription = (value: string) => {
        setNewDescription(value);
    }

    useEffect(() => {
        console.log('TaskCard changed');
    }, [newStatus, newTitle, newDescription]);
    const deleteT = () => {
        cbDelete(id);
    }
    return (
        isVisible && (
            <div className={styles['TaskCard']}>
                <EditText
                    name="title"
                    defaultValue={title}
                    inputClassName='bg-success'
                    onSave={handleChangeTitle}
                />
                <EditTextarea
                    name="description"
                    defaultValue={description}
                    onSave={handleChangeDescription}
                />
                <Listbox value={newStatus} onChange={setNewStatus}>
                    <ListboxButton>{newStatus}</ListboxButton>
                    <ListboxOptions anchor="bottom">
                        {statuses.map((stat:string) => (
                            <ListboxOption key={stat} value={stat} className="">
                                {stat}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </Listbox>
                <button onClick={() => deleteT()}>delete</button>
            </div>)
    );


}

export default TaskCard;