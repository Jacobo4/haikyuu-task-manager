import {Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react'
import {useState} from 'react'
import styles from './AddTaskDialog.component.module.css'
import {useTasks} from "../../App.tsx";
import BallSVG from "@assets/images/volleyball.svg?react";

function AddTaskDialog() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {addTask} = useTasks();
    const handleSubmit = (e) => {
        e.preventDefault();
        const values = Object.fromEntries(new FormData(e.target));
        addTask({
            id: Math.random().toString(36).substr(2, 9),
            ...values,
            status: 'Pending',
            isVisible: true
        });
        setIsOpen(false);
    }
    return (
        <>
            <button className={styles['open-button']} onClick={() => setIsOpen(true)}>
                <span>飛べ</span>
                <BallSVG/>
            </button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={styles['addTaskDialog']}>
                <DialogBackdrop className={styles['backdrop']}/>
                <div>
                    <DialogPanel className={styles['dialog']}>
                        <h3>New task</h3>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title"/>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description"/>
                            <button type={"submit"}>Add</button>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddTaskDialog;